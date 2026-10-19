const images = import.meta.glob(['../assets/*.{png,jpg,jpeg,webp,avif,PNG,JPG,JPEG,WEBP}', '!../assets/hero.png', '!../assets/epra.*', '!../assets/certificate*', '!../assets/certificte*'], {
  eager: true, query: '?url', import: 'default',
})
const priority = path => (/profile|portrait|jimmy|chege/i.test(path) ? 3 : /\/me\./i.test(path) ? 2 : 1) + (/\.webp$/i.test(path) ? .1 : 0)
const candidates = Object.entries(images)
  .filter(([path]) => !/hero\.png$|epra|fairgrid|certificate|certificte|certification|datathon|hcia|ccna|award|badge/i.test(path))
  .sort(([first], [second]) => priority(second) - priority(first) || first.localeCompare(second))
export const portraitUrl = candidates[0]?.[1] || null
export const portraitFocus = /\/me\./i.test(candidates[0]?.[0] || '') ? { x: 0.58, y: 0.3, zoom: 2.4, aboutZoom: 1.45 } : { x: 0.5, y: 0.5, zoom: 1, aboutZoom: 1 }
