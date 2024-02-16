import { Query } from '@/common/api/Query'
import { ItemList } from '@/common/models/ItemList'
import { FileQuery, File } from '@/modules/files/domain/File'

export interface FileRepo {
  create: (file: File) => Promise<File | undefined>
  update: (file: File) => Promise<File | undefined>
  remove: (id: string) => Promise<boolean>
  get: (id: string) => Promise<File | undefined>
  getAll: () => Promise<ItemList<File>>
  getByUserID: (userID: string) => Promise<File | undefined>
  getFilteredList: (query: Query<FileQuery>) => Promise<ItemList<File>>
}
