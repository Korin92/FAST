import { UserRepo } from '@/modules/users/domain/UserRepo'

export async function getUser(userRepo: UserRepo, userID: string) {
  return await userRepo.get(userID)
}
