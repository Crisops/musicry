import type { HTMLProps } from 'react'
import { Card } from '@heroui/card'
import { Skeleton as SkeletonHeroUI } from '@heroui/skeleton'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  classNames?: Partial<
    Record<
      'base' | 'wrapperBase' | 'wrapperContent' | 'image' | 'title' | 'description',
      HTMLProps<HTMLElement>['className']
    >
  >
}

const Skeleton = ({ classNames }: SkeletonProps) => {
  return (
    <Card className={cn('bg-rich-black-light', classNames?.base)} radius="lg">
      <div className={cn('flex', classNames?.wrapperBase)}>
        <SkeletonHeroUI
          className={cn(
            'bg-night before:via-rich-dark-jungle after:bg-night before:border-bg-night',
            classNames?.image,
          )}
        />
        <div className={cn('flex flex-col', classNames?.wrapperContent)}>
          <SkeletonHeroUI
            className={cn(
              'rounded-small bg-night before:via-rich-dark-jungle after:bg-night before:border-bg-night',
              classNames?.title,
            )}
          />
          <SkeletonHeroUI
            className={cn(
              'bg-night before:via-rich-dark-jungle after:bg-night before:border-bg-night',
              classNames?.description,
            )}
          />
        </div>
      </div>
    </Card>
  )
}

export default Skeleton
