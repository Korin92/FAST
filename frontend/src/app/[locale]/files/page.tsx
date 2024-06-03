import { createApiFileRepo } from '@/modules/files/infra/ApiFileRepo'
import { Table } from '@/sections/files/Table'
import { FileForm } from '@/sections/files/FileForm'

export default async function Page() {
  const fileRepository = createApiFileRepo()
  const files = await fileRepository.getAll()
  return (
    <div>
      <FileForm />
      <Table files={files.items} />
    </div>
  )
}
