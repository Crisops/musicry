import { type Column, type BaseTrackRow } from '@/types/track'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
  type TableProps,
} from '@heroui/table'
import { renderCellSong } from '@/components/react/render-cell-song'

interface TrakListProps<T extends BaseTrackRow> extends TableProps {
  rows: T[]
  columns: Column[]
}

const TrackList = <T extends BaseTrackRow>({
  rows,
  columns,
  ...props
}: TrakListProps<T>) => {
  return (
    <Table aria-label="Tabla de canciones del albúm" {...props}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            align={column.key === 'id' ? 'center' : 'start'}
            key={column.key}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(song) => (
          <TableRow key={song.id}>
            {(columnKey) => (
              <TableCell>{renderCellSong(song, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TrackList
