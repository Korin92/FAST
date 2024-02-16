import { FileRepo } from '@/modules/files/domain/FileRepo'

export async function getByUserID(fileRepo: FileRepo, userID: string) {
  return await fileRepo.getByUserID(userID)
}
