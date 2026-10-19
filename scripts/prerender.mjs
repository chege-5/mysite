import { readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// Render the same components at build time. The browser mounts the interactive app normally.
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const manifest = JSON.parse(await readFile(new URL('../dist/.vite/manifest.json', import.meta.url), 'utf8'))
  let content = renderToStaticMarkup(createElement(App))
  content = content.replace(/\/src\/assets\/[^"\s<>]+/g, source => {
    const entry = manifest[source.slice(1)]
    if (!entry?.file) throw new Error(`Missing production asset for ${source}`)
    return '/' + entry.file
  })
  const path = new URL('../dist/index.html', import.meta.url)
  const html = await readFile(path, 'utf8')
  if (!html.includes('<div id="root"></div>')) throw new Error('Missing prerender root')
  await writeFile(path, html.replace('<div id="root"></div>', `<div id="root">${content}</div>`))
  console.log('Prerendered portfolio: profile, nine project summaries, achievements, skills, education, and contact.')
} finally {
  await server.close()
}
