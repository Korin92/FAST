import { User, UserQuery } from '@/modules/users/domain/User'
import { Query } from '@/common/api/Query'
import { ItemList } from '@/common/models/ItemList'

export interface UserRepo {
  create: (user: User) => Promise<User | undefined>
  update: (user: User) => Promise<User | undefined>
  remove: (id: string) => Promise<boolean>
  getAll: () => Promise<ItemList<User>>
  get: (id: string) => Promise<User | undefined>
  getFilteredList: (query: Query<UserQuery>) => Promise<ItemList<User>>
}
