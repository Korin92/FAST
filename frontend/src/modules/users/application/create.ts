import { User } from '@/modules/users/domain/User'
import { UserRepo } from '@/modules/users/domain/UserRepo'

export async function create(
  userRepo: UserRepo,
  user: User,
): Promise<User | undefined> {
  return await userRepo.create(user)
}
