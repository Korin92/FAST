import { FileRepo } from '@/modules/files/domain/FileRepo'

export async function update(fileRepo: FileRepo, file: File) {
  return await fileRepo.update(file)
}
