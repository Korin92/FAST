import { FileRepo } from '@/modules/files/domain/FileRepo'

export async function get(fileRepo: FileRepo, fileID: string) {
  return await fileRepo.get(fileID)
}
