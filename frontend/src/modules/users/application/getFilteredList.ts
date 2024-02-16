import { Query } from '@/common/api/Query'
import { UserQuery } from '@/modules/users/domain/User'
import { UserRepo } from '@/modules/users/domain/UserRepo'

export async function getFilteredList(userRepo: UserRepo, q: Query<UserQuery>) {
  return await userRepo.getFilteredList(q)
}
