import { FileRepo } from '@/modules/files/domain/FileRepo'
import { FileQuery } from '@/modules/files/domain/File'
import { Query } from '@/common/api/Query'

export async function getFilteredList(fileRepo: FileRepo, q: Query<FileQuery>) {
  return await fileRepo.getFilteredList(q)
}
