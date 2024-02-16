export interface User {
  id: string
  name: string
  lastName: string
  email: string
  street: string
}

export function emptyUser(): User {
  return {
    id: '',
    name: '',
    lastName: '',
    email: '',
    street: '',
  }
}

export interface UserQuery {
  id?: string
  name?: string
  lastName?: string
  email?: string
  street?: string
}
