import { getResponseError, HTTPStatus } from '@/common/api/http-helpers'

export const HTTP_CLIENT_KEY = Symbol('HTTP_CLIENT_KEY')

export const ApiURL = process.env.DB_HOST ?? 'http://localhost:8000'

export interface IHTTPClient {
  get: <T>(p: RequestProps) => Promise<T>
  post: <T>(p: RequestProps) => Promise<T>
  put: <T>(p: RequestProps) => Promise<T>
  delete: (p: RequestProps) => Promise<boolean>
}

type IBody = Record<string, string | Blob> | undefined

const createRequest = (
  rp: RequestProps,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
): Request => {
  const { url, headers, type, body, options } = rp
  const requestHeaders = createHeaders(headers, type)
  const requestBody = createBody(body, type)
  const requestOptions = createOptions(options)

  return new Request(url, {
    method,
    headers: requestHeaders,
    body: requestBody,
    ...requestOptions,
  })
}

const createHeaders = (
  headers: Map<string, string> | undefined,
  type: string | undefined,
): Headers => {
  const h = new Headers()

  headers?.forEach((v, k) => {
    h.append(k, v)
  })

  if (type === 'json') {
    h.set('Content-Type', 'application/json')
  }

  return h
}

const createBody = (body: IBody, type: string | undefined): any => {
  if (!body) {
    return undefined
  }

  switch (type) {
    case 'json':
      return JSON.stringify(body)
    case 'form':
      return Object.keys(body).reduce((form, key) => {
        form.append(key, body[key])
        return form
      }, new FormData())
    case 'text':
      return body
    case 'binary':
    default:
      return ''
  }
}

const createOptions = (
  options: RequestPropsOptions | undefined,
): RequestPropsOptions | Record<string, unknown> => {
  const defaultOptions: RequestPropsOptions = {
    credentials: 'include',
  }

  return options != null ? { ...defaultOptions, ...options } : defaultOptions
}

export const HTTPClient: IHTTPClient = {
  get: async <T>(p: RequestProps): Promise<T> => {
    const res = await fetch(createRequest(p, 'GET'))
    if (res.status !== HTTPStatus.OK) {
      const error = await getResponseError(res)
      throw new Error(error.message)
    }
    return await ((await res.json()) as Promise<T>)
  },

  post: async <T>(p: RequestProps): Promise<T> => {
    const res = await fetch(createRequest(p, 'POST'))
    if (res.status !== HTTPStatus.OK && res.status !== HTTPStatus.Created) {
      const error = await getResponseError(res)
      throw new Error(error.message)
    }
    return await ((await res.json()) as Promise<T>)
  },

  put: async <T>(p: RequestProps): Promise<T> => {
    const res = await fetch(createRequest(p, 'PUT'))
    if (res.status !== HTTPStatus.OK && res.status !== HTTPStatus.Created) {
      const error = await getResponseError(res)
      throw new Error(error.message)
    }
    return await ((await res.json()) as Promise<T>)
  },

  delete: async (p: RequestProps): Promise<boolean> => {
    const res = await fetch(createRequest(p, 'DELETE'))
    if (
      res.status !== HTTPStatus.OK &&
      res.status !== HTTPStatus.NoContent &&
      res.status !== HTTPStatus.Accepted
    ) {
      const error = await getResponseError(res)
      throw new Error(error.message)
    }
    return true
  },
}

interface RequestPropsOptions {
  cache?: RequestCache
  credentials?: RequestCredentials
  headers?: HeadersInit
  integrity?: string
  keepalive?: boolean
  // method?: string
  mode?: RequestMode
  redirect?: RequestRedirect
  referrer?: string
  referrerPolicy?: ReferrerPolicy
  signal?: AbortSignal | null
  window?: any
}

export interface RequestProps {
  url: string
  headers?: Map<string, string>
  type?: 'json' | 'form' | 'text' | 'binary'
  body?: any | undefined
  options?: RequestPropsOptions
}
