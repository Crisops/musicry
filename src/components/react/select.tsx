import { albumsSelect } from '@/types/test.design'
import {
  Select as SelectHero,
  SelectItem,
  type SelectProps,
} from '@heroui/select'

export const Select = (props: Omit<SelectProps, 'children'>) => {
  return (
    <SelectHero
      classNames={{
        label: ['text-gray-dim'],
        trigger: [
          'bg-night group-data-[focus=true]:bg-night data-[hover=true]:bg-night/90',
        ],
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
    >
      {albumsSelect.map((el) => (
        <SelectItem key={el.key}>{el.label}</SelectItem>
      ))}
    </SelectHero>
  )
}
