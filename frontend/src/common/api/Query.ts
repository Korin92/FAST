import { Base64 } from 'js-base64'

export const DEFAULT_LIMIT = 20

type PropsValue = string | number | string[] | number[] | Date | BoolQueryParam
type Value = string | number | string[] | number[] | Date | BoolQueryParam

export interface QueryParamType<Q> {
  name: keyof Q | string
  value: Value
}

export interface BoolQueryParam {
  hasValue: boolean
  value: boolean
}

export interface SortParam {
  field: string
  desc?: boolean
}

export interface Pager {
  limit: number
  offset: number
}

const parseParams = (v: PropsValue): Value => {
  if (v instanceof Date) {
    return v.toString()
  }
  return v
}

const buildQuery = <Q>(
  queryParams: Map<string, QueryParamType<Q>> | undefined,
  sort: Map<string, SortParam> | undefined,
  pager: Pager | undefined,
) => {
  const q =
    queryParams !== undefined && queryParams.size > 0
      ? 'q=' +
        Base64.encode(
          JSON.stringify(
            Object.fromEntries(
              Array.from(queryParams.values()).map((qp) => [
                [qp.name],
                qp.value,
              ]),
            ),
          ),
        ) +
        '&'
      : ''
  const s =
    sort !== undefined && sort.size > 0
      ? 's=' + Base64.encode(JSON.stringify(Array.from(sort.values()))) + '&'
      : ''
  const p =
    pager !== undefined ? `lim=${pager.limit}&offset=${pager.offset}` : ''

  return q + s + p
}

const getParam = <Q>(
  queryParams: Map<string, QueryParamType<Q>>,
  key: string,
): QueryParamType<Q>['value'] | undefined => {
  return queryParams?.get(key)?.value
}

const addParam = <Q>(
  queryParams: Map<string, QueryParamType<Q>>,
  QueryParam: QueryParamType<Q>,
) => {
  queryParams?.set(QueryParam.name as string, QueryParam)
}

export const createQuery = <Q>(p: {
  query?: Array<QueryParamType<Q>>
  pager?: Pager
  sort?: SortParam[]
}): {
  buildQuery: () => ReturnType<typeof buildQuery> | undefined
  getParam: (key: string) => ReturnType<typeof getParam> | undefined
  addParam: (
    param: QueryParamType<Q>,
  ) => ReturnType<typeof addParam> | undefined
} => {
  const queryParams = new Map<string, QueryParamType<Q>>()
  const sort = new Map<string, SortParam>()
  const pager = p.pager

  if (p.query != null && p.query.length > 0) {
    p.query.forEach((v) => {
      if (v !== undefined) {
        queryParams.set(v.name as string, v)
      }
    })
  }

  if (p.sort != null && p.sort.length > 0) {
    p.sort.forEach((v) => {
      if (v !== undefined) {
        sort.set(v.field, v)
      }
    })
  }

  return {
    buildQuery: () => {
      return queryParams.size > 0 && pager != null
        ? buildQuery(queryParams, sort, pager)
        : undefined
    },
    getParam: (key: string) => {
      return queryParams.size > 0 ? getParam(queryParams, key) : undefined
    },
    addParam: (param: QueryParamType<Q>) => {
      if (param !== undefined) {
        addParam(queryParams, param)
      }
    },
  }
}

export const createQueryURL = <Q>(
  apiURL: string,
  endpoint: string,
  q: Query<Q>,
) => {
  const query = createQuery({
    query: [{ name: q.query?.name ?? '', value: q.query?.value ?? '' }],
    pager: {
      limit: DEFAULT_LIMIT,
      offset: 0,
    },
    sort: [],
  })
  const queryString = query.buildQuery()
  return `${apiURL}/${endpoint}?${queryString}`
}

export interface Query<Q> {
  query?: QueryParamType<Q>
  pager?: Pager
  sort?: SortParam
}

export const createQueryParam = <Q>(
  name: QueryParamType<Q>['name'],
  value: QueryParamType<Q>['value'],
): QueryParamType<Q> => {
  return {
    name,
    value: parseParams(value),
  }
}

export const createBoolQueryParam = (val: boolean): BoolQueryParam => {
  return {
    hasValue: true,
    value: val,
  }
}
