import { FileRepo } from '@/modules/files/domain/FileRepo'
import { createQueryURL, Query } from '@/common/api/Query'
import { emptyList, ItemList } from '@/common/models/ItemList'
import { FileQuery, File } from '@/modules/files/domain/File'
import { ApiURL, HTTPClient } from '@/common/api/HTTPClient'
import { handleError, sendSuccessStatus } from '@/common/api/http-helpers'

export function createApiFileRepo(): FileRepo {
  return {
    create,
    remove,
    update,
    get,
    getByUserID,
    getAll,
    getFilteredList,
  }
}

async function create(file: File): Promise<File | undefined> {
  try {
    const res = await HTTPClient.post<File>({
      url: `${ApiURL}/files`,
      body: file,
    })
    sendSuccessStatus()
    return res
  } catch (error) {
    handleError(error)
    return undefined
  }
}

async function remove(id: string): Promise<boolean> {
  try {
    const res = await HTTPClient.delete({ url: `${ApiURL}/file/${id}` })
    sendSuccessStatus()
    return res
  } catch (error) {
    handleError(error)
    return false
  }
}

async function update(file: File): Promise<File | undefined> {
  try {
    const res = await HTTPClient.put<File>({
      url: `${ApiURL}/files`,
      body: file,
    })
    sendSuccessStatus()
    return res
  } catch (error) {
    handleError(error)
    return undefined
  }
}

async function getAll(): Promise<ItemList<File>> {
  try {
    const res = await HTTPClient.get<ItemList<File>>({
      url: `${ApiURL}/files/list`,
    })
    sendSuccessStatus()
    return res
  } catch (error) {
    handleError(error)
    return emptyList<File>()
  }
}

async function get(id: string): Promise<File | undefined> {
  try {
    const res = await HTTPClient.get<File>({ url: `${ApiURL}/files/${id}` })
    sendSuccessStatus()
    return res
  } catch (error) {
    handleError(error)
    return undefined
  }
}

async function getByUserID(userID: string): Promise<File | undefined> {
  try {
    const res = await HTTPClient.get<File>({ url: `${ApiURL}/files/${userID}` })
    sendSuccessStatus()
    return res
  } catch (error) {
    handleError(error)
    return undefined
  }
}

async function getFilteredList(q: Query<FileQuery>) {
  try {
    const res = await HTTPClient.get<ItemList<File>>({
      url: createQueryURL(ApiURL, 'file/list', q),
    })
    sendSuccessStatus()
    return res
  } catch (error) {
    handleError(error)
    return emptyList<File>()
  }
}
