import { ApiURL, HTTPClient } from '@/common/api/HTTPClient'
import { emptyList, ItemList } from '@/common/models/ItemList'
import { User, UserQuery } from '@/modules/users/domain/User'
import { handleError, sendSuccessStatus } from '@/common/api/http-helpers'
import { createQueryURL, Query } from '@/common/api/Query'
import { UserRepo } from '@/modules/users/domain/UserRepo'

export function createApiUserRepo(): UserRepo {
  return {
    create,
    remove,
    update,
    get,
    getAll,
    getFilteredList,
  }
}

async function getAll() {
  try {
    const res = await HTTPClient.get<ItemList<User>>({
      url: `${ApiURL}/users/list`,
    })
    sendSuccessStatus()
    return res
  } catch (error) {
    handleError(error)
    return emptyList<User>()
  }
}

async function get(userID: string) {
  try {
    const res = await HTTPClient.get<User>({ url: `${ApiURL}/users/${userID}` })
    sendSuccessStatus()
    return res
  } catch (error) {
    handleError(error)
    return undefined
  }
}

async function getFilteredList(q: Query<UserQuery>) {
  try {
    const res = await HTTPClient.get<ItemList<User>>({
      url: createQueryURL(ApiURL, 'users/list', q),
    })
    sendSuccessStatus()
    return res
  } catch (error) {
    handleError(error)
    return emptyList<User>()
  }
}

async function create(user: User) {
  try {
    // const res = await HTTPClient.post<User>({ url: `${ApiURL}/users`, body: user })
    sendSuccessStatus()
    return user
  } catch (error) {
    handleError(error)
    return undefined
  }
}

async function update(user: User) {
  try {
    // const res = await HTTPClient.put<User>({ url: `${ApiURL}/users`, body: user })
    sendSuccessStatus()
    return user
  } catch (error) {
    handleError(error)
    return undefined
  }
}

async function remove(userID: string) {
  try {
    const res = await HTTPClient.delete({ url: `${ApiURL}/users/${userID}` })
    sendSuccessStatus()
    return res
  } catch (error) {
    handleError(error)
    return false
  }
}
