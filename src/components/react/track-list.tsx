import { type Column, type BaseTrackRow } from '@/types/track'
import { Table, TableHeader, TableBody, TableRow, TableCell, TableColumn, type TableProps } from '@heroui/table'
import { renderCellSong } from '@/components/react/render-cell-song'

interface TrakListProps<T extends BaseTrackRow> extends TableProps {
  rows: T[]
  columns: Column[]
  tap?: 'song' | 'album'
  onRemoveItem?: (id: string) => void
}

const TrackList = <T extends BaseTrackRow>({
  rows,
  columns,
  tap = 'song',
  onRemoveItem,
  ...props
}: TrakListProps<T>) => {
  onRemoveItem = onRemoveItem ?? (() => {})
  return (
    <Table aria-label="Tabla de canciones del albúm" {...props}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn align={column.key === 'index' ? 'center' : 'start'} key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows} emptyContent={tap === 'song' ? 'No hay canciones' : 'No hay álbumes'}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCellSong(item, columnKey, tap, onRemoveItem)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TrackList
