import type { Tables } from '@/types/database.types'
import { Select as SelectHero, SelectItem, type SelectProps as SelectPropsHeroui } from '@heroui/select'

interface SelectProps extends Omit<SelectPropsHeroui, 'children'> {
  items: Tables<'albums'>[]
}

export const Select = ({ items, ...props }: SelectProps) => {
  return (
    <SelectHero
      classNames={{
        label: ['text-gray-dim'],
        trigger: 'bg-night group-data-[focus=true]:bg-night data-[hover=true]:bg-night/90',
        value: ['group-data-[has-value=true]:text-sealsalt'],
        selectorIcon: ['text-gray-dim'],
      }}
      listboxProps={{
        itemClasses: {
          base: [
            'rounded-md',
            'text-gray-dim',
            'transition-opacity',
            'data-[hover=true]:bg-rich-dark-jungle',
            'data-[selectable=true]:focus:bg-rich-dark-jungle',
            'data-[pressed=true]:opacity-70',
            'data-[selectable=true]:focus:text-sealsalt',
          ],
        },
      }}
      popoverProps={{
        placement: 'top-start',
        classNames: {
          content: 'p-0 border-small border-divider bg-night',
        },
      }}
      {...props}
      radius="sm"
      size="sm"
      items={items}
    >
      {(album) => <SelectItem key={album.id}>{album.title}</SelectItem>}
    </SelectHero>
  )
}
