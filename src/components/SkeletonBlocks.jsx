import { cn } from '../lib/utils'

function SkeletonLine({ className, ...props }) {
  return (
    <div
      className={cn('h-4 rounded bg-white/[0.04] animate-pulse', className)}
      {...props}
    />
  )
}

function SkeletonBlock({ className, ...props }) {
  return (
    <div
      className={cn('rounded-lg bg-white/[0.04] animate-pulse', className)}
      {...props}
    />
  )
}

export function SectionHeaderSkeleton() {
  return (
    <div className="mb-12 space-y-3">
      <SkeletonLine className="w-24" />
      <SkeletonLine className="w-48 h-8" />
      <SkeletonLine className="w-full max-w-2xl" />
    </div>
  )
}

const sectionLayouts = {
  about: [
    { type: 'header' },
    { type: 'grid', cols: 2, count: 4 },
    { type: 'lines', count: 3 },
  ],
  projects: [
    { type: 'header' },
    { type: 'card', count: 3 },
  ],
  skills: [
    { type: 'header' },
    { type: 'grid', cols: 4, count: 8 },
  ],
  security: [
    { type: 'header' },
    { type: 'card', count: 2 },
  ],
  certifications: [
    { type: 'header' },
    { type: 'box' },
  ],
  cv: [
    { type: 'header' },
    { type: 'lines', count: 6 },
  ],
  experience: [
    { type: 'header' },
    { type: 'list', count: 3 },
  ],
  contact: [
    { type: 'header' },
    { type: 'form' },
  ],
}

function SkeletonForLayout({ layout }) {
  if (layout.type === 'header') return <SectionHeaderSkeleton />
  if (layout.type === 'grid') {
    return (
      <div className={`grid gap-4 ${layout.cols === 2 ? 'sm:grid-cols-2' : layout.cols === 3 ? 'sm:grid-cols-3' : layout.cols === 4 ? 'sm:grid-cols-4' : ''}`}>
        {Array.from({ length: layout.count }).map((_, i) => (
          <SkeletonBlock key={i} className="h-24" />
        ))}
      </div>
    )
  }
  if (layout.type === 'lines') {
    return (
      <div className="space-y-3">
        {Array.from({ length: layout.count }).map((_, i) => (
          <SkeletonLine key={i} className={cn('max-w-full', i === layout.count - 1 ? 'w-2/3' : '')} />
        ))}
      </div>
    )
  }
  if (layout.type === 'card') {
    return (
      <div className="space-y-6">
        {Array.from({ length: layout.count }).map((_, i) => (
          <SkeletonBlock key={i} className="h-48 w-full" />
        ))}
      </div>
    )
  }
  if (layout.type === 'box') {
    return <SkeletonBlock className="h-40 w-full" />
  }
  if (layout.type === 'list') {
    return (
      <div className="space-y-8">
        {Array.from({ length: layout.count }).map((_, i) => (
          <SkeletonBlock key={i} className="h-32 w-full" />
        ))}
      </div>
    )
  }
  if (layout.type === 'form') {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-12 w-full" />
        ))}
        <SkeletonBlock className="h-32 w-full" />
        <SkeletonLine className="w-32 h-10" />
      </div>
    )
  }
  return null
}

export function SectionSkeleton({ section }) {
  const layout = sectionLayouts[section] || [{ type: 'header' }, { type: 'lines', count: 3 }]
  return (
    <div className="py-24 sm:py-32 mx-3 sm:mx-6 lg:mx-10 max-w-6xl" aria-hidden="true">
      {layout.map((item, i) => (
        <SkeletonForLayout key={i} layout={item} />
      ))}
    </div>
  )
}
