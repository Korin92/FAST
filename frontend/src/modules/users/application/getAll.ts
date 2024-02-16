import { UserRepo } from '@/modules/users/domain/UserRepo'

export async function getAll(userRepo: UserRepo) {
  return await userRepo.getAll()
}
