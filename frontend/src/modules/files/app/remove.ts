import { FileRepo } from '@/modules/files/domain/FileRepo'

export async function remove(fileRepo: FileRepo, id: string) {
  return await fileRepo.remove(id)
}
