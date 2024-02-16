export interface ItemList<T> {
  [x: string]: any
  items: T[]
  count: number
}

export function emptyList<T>(): ItemList<T> {
  return {
    items: [],
    count: 0,
  }
}
