export interface File {
  id: string
  name: string
  base64: string
  mimeType: string
  ownerID: string
  date: Date
  extension: string
}

export interface FileQuery {
  id?: string
  name?: string
  base64?: string
  mimeType?: string
  ownerID?: string
  date?: Date
  extension?: string
}
