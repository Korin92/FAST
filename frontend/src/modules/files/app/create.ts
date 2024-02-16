import { FileRepo } from '@/modules/files/domain/FileRepo'

export async function create(fileRepo: FileRepo, file: File) {
  return await fileRepo.create(file)
}
