import { FileRepo } from '@/modules/files/domain/FileRepo'

export async function getAll(fileRepo: FileRepo) {
  return await fileRepo.getAll()
}
