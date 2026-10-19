import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const baseURL = process.env.PORTFOLIO_BASE_URL || 'http://localhost:5173'
const output = new URL('../artifacts/portfolio/', import.meta.url)
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true, args: ['--enable-unsafe-swiftshader'] })
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
const page = await context.newPage()
const errors = []
page.on('pageerror', error => errors.push(error.message))

try {
  const response = await page.goto(baseURL, { waitUntil: 'networkidle' })
  assert.equal(response.status(), 200)
  assert.equal(await page.locator('h1').count(), 1)
  assert.equal(await page.locator('.project-card').count(), 9)
  assert.equal(await page.locator('.project-card .project-artwork').count(), 9)
  assert.equal(await page.locator('.project-github[href^="https://github.com/chege-5/"]').count(), 9)
  assert.equal(await page.locator('.education-stop').count(), 4)
  assert.deepEqual(await page.locator('.proficiency-card').first().getByRole('meter').evaluateAll(elements => elements.slice(0,3).map(element => element.getAttribute('aria-label'))), ['C#', 'Python', 'JavaScript'])
  assert.deepEqual(await page.locator('.proficiency-card').nth(1).getByRole('meter').evaluateAll(elements => elements.slice(0,3).map(element => element.getAttribute('aria-label'))), ['ASP.NET Core / .NET', 'FastAPI', 'Node.js'])
  for (const selector of ['.header-avatar img', '.about-avatar img', '.event-photo img', '.document-photo img']) {
    assert.equal(await page.locator(selector).evaluate(element => getComputedStyle(element).filter), 'none')
  }
  assert.equal(await page.getByRole('button', { name: 'Read Transwest case study', exact: true }).count(), 1)
  assert.equal(await page.getByRole('button', { name: 'Read SACCO Management case study', exact: true }).count(), 0)
  assert.match(await page.locator('#highlights').innerText(), /3rd place/)
  assert.match(await page.locator('#highlights').innerText(), /Best Use of Data/)
  assert.match(await page.locator('#training').innerText(), /CCNA studies/)
  assert.match(await page.locator('#training').innerText(), /HCIA studies/)
  assert.match(await page.locator('#training').innerText(), /ICS College/)
  assert.equal(await page.getByRole('meter').count(), 10)
  for (const meter of await page.getByRole('meter').all()) {
    const value = Number(await meter.getAttribute('aria-valuenow'))
    assert.ok(value >= 80 && value <= 94)
  }
  assert.match(await page.locator('.header-avatar img').getAttribute('src'), /\/me\./)
  assert.match(await page.locator('.about-avatar img').getAttribute('src'), /\/me\./)
  assert.match(await page.locator('.event-photo img').getAttribute('src'), /epra/)
  assert.match(await page.locator('.document-photo img').getAttribute('src'), /certificate/)
  await page.waitForFunction(() => document.querySelector('link[rel="icon"]').href.startsWith('data:image/png'))
  await page.getByRole('button', { name: 'View participation certificate' }).click()
  await page.getByRole('dialog').locator('.certificate-preview').evaluate(element => element.decode())
  assert.match(await page.getByRole('dialog').innerText(), /11 July 2026/)
  await page.keyboard.press('Escape')
  await page.getByRole('dialog').waitFor({ state: 'hidden' })
  assert.equal(await page.locator('[class*="lucide-arrow"]').count(), 0)
  await page.locator('.scene-ready canvas').waitFor()
  assert.equal(await page.getByRole('button', { name: 'Reduced motion', exact: true }).isDisabled(), true)
  assert.equal(await page.locator('.hero-scene-frame').getAttribute('data-animating'), 'false')

  for (const [filter, count] of [['Full-stack', 2], ['Security', 3], ['AI & data', 3], ['Data & automation', 1], ['All work', 9]]) {
    await page.getByRole('button', { name: filter, exact: filter !== 'All work' }).click()
    assert.equal(await page.locator('.project-card').count(), count)
  }

  for (const name of ['FairGrid', 'VulNexus', 'HashX', 'SentinelX', 'Transwest', 'Kodisha', 'summAI', 'Tutor AI', 'Mastered Seed']) {
    const trigger = page.getByRole('button', { name: `Read ${name} case study`, exact: true })
    await trigger.click()
    const dialog = page.getByRole('dialog')
    await dialog.waitFor({ state: 'visible' })
    assert.match(await dialog.textContent(), /The challenge/)
    assert.match(await dialog.textContent(), /System architecture/)
    await dialog.getByRole('button', { name: /Show (interface|workflow) concept/ }).click()
    assert.equal(await dialog.locator('.media-flipper').getAttribute('data-flipped'), 'true')
    assert.equal(await dialog.locator('.media-front').isVisible(), false)
    assert.equal(await dialog.locator('.media-back').isVisible(), true)
    await dialog.getByRole('button', { name: 'Show project artwork' }).click()
    assert.equal(await dialog.locator('.media-flipper').getAttribute('data-flipped'), 'false')
    await page.keyboard.press('Escape')
    await dialog.waitFor({ state: 'hidden' })
    await page.waitForFunction(element => element === document.activeElement, await trigger.elementHandle())
  }

  await page.getByRole('button', { name: 'Read VulNexus case study' }).click()
  await page.getByRole('dialog').getByRole('link', { name: 'Discuss this project' }).click()
  await page.getByRole('dialog').waitFor({ state: 'hidden' })
  await page.waitForURL('**/#contact')

  const toolkit = page.locator('.stack-details').first()
  await toolkit.locator('summary').click()
  assert.equal(await toolkit.getAttribute('open'), '')
  assert.match(await toolkit.textContent(), /ASP.NET Core/)
  await toolkit.locator('summary').click()

  // Observe the mailto request without opening an external email application.
  await page.route('mailto:**', route => route.abort())
  await page.getByLabel('Your name', { exact: true }).fill('Portfolio QA')
  await page.getByLabel('Email address', { exact: true }).fill('qa@example.com')
  await page.getByLabel('What’s it about?', { exact: true }).fill('Project & collaboration')
  await page.getByLabel('Your message', { exact: true }).fill('A sample message for the browser check.')
  await page.getByRole('button', { name: 'Open email app' }).click()
  assert.match(await page.locator('.form-status').textContent(), /email app/)
  assert.doesNotMatch(await page.locator('.form-status').textContent(), /Message sent/)
  assert.equal(await page.getByLabel('Your name', { exact: true }).inputValue(), 'Portfolio QA')

  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.getByRole('button', { name: 'Copy email address' }).click()
  await page.getByRole('button', { name: 'Email copied' }).waitFor()
  assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'jimmykihara05@gmail.com')

  // Enable a browser-local endpoint and intercept it: no message leaves the test.
  await page.evaluate(async () => {
    const { contactForm } = await import('/src/data/config.js')
    contactForm.endpoint = '/api/contact'
  })
  await page.getByLabel('Your name', { exact: true }).fill('Endpoint QA')
  await page.route('**/api/contact', route => route.fulfill({ status: 500, body: 'Test failure' }))
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await page.locator('.form-status[role="alert"]').waitFor()
  assert.equal(await page.getByLabel('Your name', { exact: true }).inputValue(), 'Endpoint QA')
  await page.unroute('**/api/contact')
  await page.route('**/api/contact', route => {
    assert.equal(route.request().method(), 'POST')
    assert.equal(route.request().postDataJSON().name, 'Endpoint QA')
    return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
  })
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await page.waitForFunction(() => document.querySelector('.form-status').textContent.includes('Message sent'))
  assert.equal(await page.getByLabel('Your name', { exact: true }).inputValue(), '')
  assert.equal(await page.getByRole('button', { name: 'Message sent', exact: true }).count(), 1)
  assert.equal(await page.locator('.celebration').count(), 1)

  for (const width of [320, 390, 540, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    assert.equal(await page.locator('body').evaluate(element => element.scrollWidth <= window.innerWidth), true, `Overflow at ${width}px`)
  }

  await page.setViewportSize({ width: 390, height: 844 })
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.getByRole('dialog').getByRole('link', { name: 'Expertise', exact: true }).click()
  await page.getByRole('dialog').waitFor({ state: 'hidden' })
  await page.waitForURL('**/#skills')
  await page.getByRole('button', { name: 'Read VulNexus case study' }).click()
  assert.equal(await page.getByRole('dialog').evaluate(element => element.scrollWidth <= element.clientWidth), true)
  await page.keyboard.press('Escape')

  await page.goto(`${baseURL}/cv.html`)
  assert.match(await page.locator('h1').textContent(), /Kihara Jimmy Chege/)
  assert.equal(await page.locator('article').count(), 9)
  await page.emulateMedia({ media: 'print' })
  await page.pdf({ path: fileURLToPath(new URL('resume-preview.pdf', output)), format: 'A4', printBackground: true })
  await page.emulateMedia({ media: 'screen' })

  await page.goto(baseURL, { waitUntil: 'networkidle' })
  await page.screenshot({ path: fileURLToPath(new URL('mobile.png', output)), fullPage: true })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.screenshot({ path: fileURLToPath(new URL('desktop.png', output)), fullPage: true })
  await page.screenshot({ path: fileURLToPath(new URL('desktop-top.png', output)) })
  for (const image of await page.locator('.project-artwork').all()) {
    await image.scrollIntoViewIfNeeded()
    await image.evaluate(element => element.decode())
    assert.equal(await image.evaluate(element => element.naturalWidth > 0), true)
  }

  const animatedPage = await context.newPage()
  animatedPage.on('pageerror', error => errors.push(error.message))
  await animatedPage.emulateMedia({ reducedMotion: 'no-preference' })
  await animatedPage.goto(baseURL, { waitUntil: 'networkidle' })
  await animatedPage.locator('.scene-ready canvas').waitFor()
  const canvas = animatedPage.locator('canvas')
  const firstFrame = await canvas.screenshot()
  await animatedPage.waitForTimeout(250)
  const secondFrame = await canvas.screenshot()
  assert.equal(firstFrame.equals(secondFrame), false, 'The 3D scene should visibly animate')
  await animatedPage.getByRole('button', { name: 'Pause motion', exact: true }).click()
  assert.equal(await animatedPage.locator('.hero-scene-frame').getAttribute('data-animating'), 'false')
  await animatedPage.getByRole('button', { name: 'Play motion', exact: true }).click()
  assert.equal(await animatedPage.locator('.hero-scene-frame').getAttribute('data-animating'), 'true')
  await animatedPage.locator('.button-outline').first().hover()
  await animatedPage.waitForFunction(() => getComputedStyle(document.querySelector('.hero-actions .button-outline')).backgroundColor === 'rgb(216, 203, 183)')
  assert.notEqual(await animatedPage.locator('.hero-actions .button-outline').evaluate(element => element.style.getPropertyValue('--magnet-x')), '')
  await animatedPage.getByRole('button', { name: 'Security', exact: true }).click()
  await animatedPage.waitForFunction(() => document.querySelectorAll('.project-card').length === 3)
  await animatedPage.getByRole('button', { name: /All work/ }).click()
  await animatedPage.waitForFunction(() => document.querySelectorAll('.project-card').length === 9)
  await animatedPage.getByRole('button', { name: 'Read VulNexus case study' }).click()
  await animatedPage.getByRole('dialog').getByRole('button', { name: 'Show interface concept' }).click()
  await animatedPage.waitForFunction(() => document.querySelector('.media-flipper').getAttribute('data-flipped') === 'true')
  await animatedPage.keyboard.press('Escape')
  await animatedPage.locator('#contact').scrollIntoViewIfNeeded()
  await animatedPage.waitForFunction(() => document.querySelector('.hero-scene-frame').dataset.animating === 'false')
  assert.notEqual(await animatedPage.locator('.hero-scene-frame').evaluate(element => element.style.getPropertyValue('--parallax-y')), '')
  await animatedPage.locator('.project-card').first().scrollIntoViewIfNeeded()
  await animatedPage.waitForFunction(() => document.querySelector('.project-card').classList.contains('is-visible'))
  await animatedPage.locator('.project-trigger').first().hover({ position: { x: 30, y: 30 } })
  await animatedPage.waitForFunction(() => Number.parseFloat(document.querySelector('.project-card').style.getPropertyValue('--tilt-x')) !== 0)
  await animatedPage.screenshot({ path: fileURLToPath(new URL('artwork-projects.png', output)) })
  await animatedPage.locator('#contact').scrollIntoViewIfNeeded()
  await animatedPage.waitForFunction(() => !document.querySelector('.project-card').classList.contains('is-visible'))
  const barReached = target => {
    const bar = document.querySelector('.proficiency-track > span')
    const scale = new DOMMatrixReadOnly(getComputedStyle(bar).transform).a
    return Math.abs(scale - target) < .01
  }
  await animatedPage.locator('.proficiency-card').first().scrollIntoViewIfNeeded()
  await animatedPage.waitForFunction(barReached, 1)
  await animatedPage.locator('#contact').scrollIntoViewIfNeeded()
  await animatedPage.waitForFunction(barReached, 0)
  await animatedPage.locator('.proficiency-card').first().scrollIntoViewIfNeeded()
  await animatedPage.waitForFunction(barReached, 1)
  await animatedPage.locator('.project-card').first().scrollIntoViewIfNeeded()
  await animatedPage.waitForFunction(() => document.querySelector('.project-card').classList.contains('is-visible'))
  await animatedPage.locator('#home').scrollIntoViewIfNeeded()
  await animatedPage.waitForFunction(() => document.querySelector('.typing-copy').textContent === 'Jimmy Chege.')
  await animatedPage.getByRole('button', { name: 'Pause background motion' }).click()
  assert.equal(await animatedPage.locator('.ambient-background').getAttribute('data-paused'), 'true')
  await animatedPage.getByRole('button', { name: 'Play background motion' }).click()
  assert.equal(await animatedPage.locator('.ambient-background').getAttribute('data-paused'), 'false')
  await animatedPage.emulateMedia({ reducedMotion: 'reduce' })
  await animatedPage.waitForFunction(() => document.querySelectorAll('.reveal-on-scroll').length === 0)
  await animatedPage.waitForFunction(() => document.querySelector('.hero-scene-frame').dataset.animating === 'false')
  assert.equal(await animatedPage.locator('.ambient-background').getAttribute('data-paused'), 'true')
  await animatedPage.close()
  assert.deepEqual(errors, [])
  console.log('PASS: animated project filters, expanding dialogs, interface flippers, keyboard focus, contact flows and success feedback, clipboard, compact mobile navigation, six responsive widths, résumé, all project images, visible 3D animation, pause/play, offscreen rendering pause, live reduced-motion changes, magnetic buttons, hover fill, card tilt, reversible scroll reveals, typed introduction, and background motion controls. No browser errors.')
} finally {
  await browser.close()
}
