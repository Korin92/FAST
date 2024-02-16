import { UserRepo } from '@/modules/users/domain/UserRepo'

export async function remove(userRepo: UserRepo, id: string) {
  return await userRepo.remove(id)
}
