import { memo, type HTMLProps } from 'react'
import { cn } from '@/lib/utils'

interface EqualizerProps {
  className?: HTMLProps<HTMLDivElement>['className']
  color?: HTMLProps<HTMLDivElement>['className']
}

const Equalizer = memo(function YouTubeEqualizer({ className, color = '#ffffff' }: EqualizerProps) {
  return (
    <div
      className={cn(`flex h-3 items-end justify-center gap-x-px`, className)}
      role="img"
      aria-label={'Reproduciendo audio'}
    >
      {[0, 0.3, 0.6].map((delay, i) => (
        <div
          key={i}
          className={`${color} equalizer-bar h-1.5 w-0.5 rounded-t-xs`}
          style={{
            animationDelay: `${delay}s`,
          }}
        />
      ))}
    </div>
  )
})

export default Equalizer
