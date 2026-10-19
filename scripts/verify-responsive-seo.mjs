import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const baseURL = process.env.PORTFOLIO_BASE_URL || 'http://localhost:5173'
const browser = await chromium.launch({ headless: true, args: ['--enable-unsafe-swiftshader'] })
const errors = []
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' })
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(baseURL, { waitUntil: 'networkidle' })
  const failures = []
  const sizes = [[280,653],[320,568],[360,800],[390,844],[430,932],[540,720],[600,960],[768,1024],[800,600],[820,1180],[912,1368],[1024,768],[1280,800],[1440,900],[1920,1080],[2560,1440],[3440,1440],[3840,2160],[844,390],[932,430]]
  for (const [width,height] of sizes) {
    await page.setViewportSize({ width,height })
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      clipped: [...document.querySelectorAll('h1,h2,h3,.project-stop,.education-stop .training-card,.contact-form,.proficiency-card,.wordmark,.nav-contact')]
        .filter(element => { const r = element.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth + 1 || (!element.classList.contains('project-stop') && element.scrollWidth > element.clientWidth + 2)) })
        .map(element => `${element.tagName}.${element.className}: ${element.textContent.slice(0,45)}`),
    }))
    if (layout.overflow || layout.clipped.length) failures.push({ width,height,...layout })
  }
  assert.equal(failures.length, 0, `Responsive issues: ${JSON.stringify(failures)}`)
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
  assert.match(html, /<h1/)
  assert.match(html, /FairGrid/)
  assert.match(html, /Ethical Hacking/)
  assert.doesNotMatch(html, /\/src\/assets\//)
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
  const graph = JSON.parse(json)['@graph']
  assert.ok(graph.some(item => item['@type'] === 'ProfilePage'))
  assert.equal(graph.find(item => item['@type'] === 'Person').name, 'Kihara Jimmy Chege')
  for (const path of ['/robots.txt','/sitemap.xml','/images/jimmy-chege.webp','/og-image.png']) {
    assert.equal((await page.request.get(baseURL + path)).status(), 200, path)
  }
  const servedHTML = await (await page.request.get(baseURL)).text()
  if (/src="\/assets\//.test(servedHTML)) {
    assert.match(servedHTML, /<h1/)
    const staticPage = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
    await staticPage.goto(baseURL, { waitUntil: 'networkidle' })
    assert.equal(await staticPage.getByRole('heading', { level: 1 }).count(), 1)
    assert.equal(await staticPage.locator('.project-card').count(), 9)
    assert.match(await staticPage.locator('#highlights').innerText(), /Best Use of Data/)
    await staticPage.close()
  }
  const touch = await browser.newContext({ isMobile: true, hasTouch: true, reducedMotion: 'reduce', viewport: { width: 390, height: 844 } })
  const touchPage = await touch.newPage()
  await touchPage.goto(baseURL, { waitUntil: 'networkidle' })
  const menu = touchPage.getByRole('button', { name: 'Open navigation' })
  const bounds = await menu.boundingBox()
  assert.ok(bounds.width >= 44 && bounds.height >= 44)
  await menu.tap()
  await touchPage.getByRole('dialog').getByRole('link', { name: 'Work', exact: true }).tap()
  await touchPage.getByRole('dialog').waitFor({ state: 'hidden' })
  await touchPage.waitForURL('**/#projects')
  for (const width of [280,390,768,1440]) {
    await touchPage.setViewportSize({ width, height: 700 })
    await touchPage.getByRole('button', { name: 'Read VulNexus case study' }).click()
    const dialog = touchPage.getByRole('dialog')
    assert.equal(await dialog.evaluate(element => element.scrollWidth <= element.clientWidth + 1), true, `Dialog overflow at ${width}px`)
    await dialog.getByRole('button', { name: 'Close', exact: true }).click()
    await dialog.waitFor({ state: 'hidden' })
  }
  await touch.close()
  assert.deepEqual(errors, [])
  console.log(`PASS: ${sizes.length} phone, tablet, desktop, ultrawide and landscape layouts; prerendered HTML; structured data; sitemap and robots files.`)
} finally {
  await browser.close()
}
