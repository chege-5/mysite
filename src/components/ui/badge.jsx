import * as React from 'react'
import { cn } from '../../lib/utils'

function Badge({ className, variant = 'default', ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
        variant === 'default' && 'border-white/10 bg-white/5 text-fg-muted',
        variant === 'green' && 'border-green/20 bg-green/10 text-green',
        variant === 'orange' && 'border-orange/20 bg-orange/10 text-orange',
        variant === 'ghost' && 'border-transparent bg-transparent text-fg-subtle',
        className
      )}
      {...props}
    />
  )
}
Badge.displayName = 'Badge'

export { Badge }
