import { useState } from 'react'

export function ProjectMedia({ image, artwork, children, color, conceptLabel = 'INTERFACE CONCEPT' }) {
  const [flipped, setFlipped] = useState(false)
  const conceptName = conceptLabel === 'WORKFLOW CONCEPT' ? 'workflow concept' : 'interface concept'

  return (
    <div className={`project-media project-${color}`}>
      <div className="media-toolbar">
        <span>{flipped ? conceptLabel : 'PROJECT ARTWORK'}</span>
        <button type="button" aria-pressed={flipped} onClick={() => setFlipped(value => !value)}>
          {flipped ? 'Show project artwork' : `Show ${conceptName}`}
          <span aria-hidden="true">↻</span>
        </button>
      </div>
      <div className="media-flipper" data-flipped={flipped}>
        <div className="media-face media-front" aria-hidden={flipped}>
          {artwork || <img className="case-artwork" src={image.src} alt={image.alt} onError={event => { if (image.fallback && !event.currentTarget.src.endsWith(image.fallback)) event.currentTarget.src = image.fallback }} width="1100" height="733"/>}
        </div>
        <div className="media-face media-back" aria-hidden={!flipped}>
          <div className="case-interface" aria-label="Illustrative project concept">{children}</div>
        </div>
      </div>
      <p className="media-caption">Illustrative project photo. Switch views to explore the {conceptLabel === 'WORKFLOW CONCEPT' ? 'workflow' : 'interface'} concept.{image?.source && <> Photo by <a href={image.source} target="_blank" rel="noreferrer">{image.author} / Unsplash</a>.</>}</p>
    </div>
  )
}
