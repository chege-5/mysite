import { projectImages } from '../data/projectImages'
export function getProjectImage(project) { return projectImages[project.id] || null }
export function ProjectArtwork({ project, className = '' }) {
  const image = getProjectImage(project)
  return image ? <img className={`project-artwork ${className}`} src={image.src} alt={image.alt} loading="lazy" decoding="async" width="1200" height="800"/> : null
}
