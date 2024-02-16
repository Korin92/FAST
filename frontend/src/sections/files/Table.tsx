import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { File } from '@/modules/files/domain/File'

interface TableProps {
  files: File[]
}
export const Table: React.FC<TableProps> = ({ files }) => {
  return (
    <div className="card">
      <DataTable value={files} showGridlines tableStyle={{ minWidth: '50rem' }}>
        <Column field="name" header="Nombre"></Column>
        <Column field="ownerID" header="Creador"></Column>
        <Column field="date" header="Fecha"></Column>
        <Column field="extension" header="Tipo de archivo"></Column>
      </DataTable>
    </div>
  )
}
