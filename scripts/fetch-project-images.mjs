import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'

const sources = [
  ['fairgrid', 'transmission-tower-during-golden-hour-YQrbMEKrlbU', 'Chris Lawton', 'Electricity transmission lines at sunset'],
  ['vulnnexus', 'a-rack-of-servers-in-a-server-room-2JJ3wBHu4_0', 'Kevin Ache', 'Server infrastructure in a data center'],
  ['hashx', 'code-is-displayed-on-a-computer-monitor-zUrEj_OwLQM', 'Rob Wingate', 'Source code on a computer monitor'],
  ['sentinelx', 'ethernet-cable-w0aMCZIW6Qc', 'Claudio Schwarz', 'Ethernet connections and network infrastructure'],
  ['transwest', 'low-angle-photography-of-high-rise-buildings-M6QVOPp9gHQ', 'Markus Spiske', 'Business buildings viewed from below'],
  ['kodisha', 'exterior-of-a-modern-apartment-building-with-balconies-VxVldSjtmQI', 'Timon Reinhard', 'Modern apartment building with balconies'],
  ['summai', 'desk-with-open-book-laptop-and-study-materials-HNjWq8WPyoY', 'Yen Vu', 'Notebook, laptop and study materials on a desk'],
  ['tutor-ai', 'books-organized-in-a-shelf--9C3TMXwQjQ', 'Jamie Taylor', 'Library shelves filled with books'],
  ['mastered-seed', 'close-up-view-of-a-car-engine-compartment-k0HQnRcyEW0', 'Laura Oliveira', 'Automotive engine and components'],
]
const directory = new URL('../public/images/projects/', import.meta.url)
await mkdir(directory, { recursive: true })
const previous = JSON.parse(await readFile(new URL('credits.json', directory), 'utf8').catch(() => '[]'))
const fetchRetry = async url => {
  for (let attempt = 0; attempt < 3; attempt++) {
    try { return await fetch(url) } catch (error) { if (attempt === 2) throw error }
  }
}
const credits = await Promise.all(sources.map(async ([id, slug, author, alt]) => {
  const source = `https://unsplash.com/photos/${slug}`
  const cached = previous.find(item => item.source === source)
  if (cached) {
    if (cached.id !== id) await copyFile(new URL(`${cached.id}.webp`, directory), new URL(`${id}.webp`, directory))
    return { ...cached, id, src: `/images/projects/${id}.webp`, alt }
  }
  const response = await fetchRetry(source)
  if (!response.ok) throw new Error(`${id}: source ${response.status}`)
  const html = await response.text()
  const raw = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1]
  if (!raw) throw new Error(`Missing image: ${id}`)
  const url = new URL(raw.replaceAll('&amp;', '&'))
  url.search = new URLSearchParams({ auto: 'format', fit: 'crop', w: '1200', q: '85', fm: 'webp', ...(id === 'sentinelx' ? { crop: 'right', ar: '16:10' } : {}) }).toString()
  const image = await fetchRetry(url)
  if (!image.ok || !image.headers.get('content-type')?.startsWith('image/')) throw new Error(`Download failed: ${id}`)
  const data = Buffer.from(await image.arrayBuffer())
  await writeFile(new URL(`${id}.webp`, directory), data)
  console.log(`${id}: ${Math.round(data.length / 1024)} KB`)
  return { id, src: `/images/projects/${id}.webp`, author, alt, source, license: 'https://unsplash.com/license' }
}))
await writeFile(new URL('credits.json', directory), JSON.stringify(credits, null, 2) + '\n')
await writeFile(new URL('../src/data/projectImages.js', import.meta.url), 'export const projectImages = ' + JSON.stringify(Object.fromEntries(credits.map(item => [item.id, item])), null, 2) + '\n')
await writeFile(new URL('CREDITS.md', directory), '# Project cover photographs\n\nIllustrative subject photographs, not screenshots of the applications. Photos are used under the [Unsplash License](https://unsplash.com/license).\n\n' + credits.map(item => `- **${item.id}**: [${item.author}](${item.source}) — ${item.alt}.`).join('\n') + '\n')
