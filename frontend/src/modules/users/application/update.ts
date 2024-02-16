import { UserRepo } from '@/modules/users/domain/UserRepo'
import { User } from '@/modules/users/domain/User'

export async function update(userRepo: UserRepo, user: User) {
  return await userRepo.update(user)
}
