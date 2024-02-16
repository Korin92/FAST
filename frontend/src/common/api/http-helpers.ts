import { createQuery, QueryParamType, SortParam, Pager, Query } from './Query'
import { sendStatus } from '@/common/status/StatusService'

export const getResponseError = async (res: Response): Promise<Error> => {
  const errorMessage = `${
    httpStatuses()[res.status as HTTPStatus]
  } ${await res.text()}`
  const error = new Error(errorMessage)
  error.name = httpStatuses()[res.status as HTTPStatus]
  return error
}

export function sendSuccessStatus() {
  sendStatus({
    variant: 'success',
    message: 'La petición se ha completado con éxito',
  })
}

export function handleError(error: Error | unknown): void {
  if (error instanceof Error) {
    sendErrorStatus(error.message, error)
  } else {
    sendUnknownErrorStatus()
  }
}

export function sendErrorStatus(message: string, error: Error): void {
  sendStatus({ variant: 'error', message, error })
}

export function sendUnknownErrorStatus(): void {
  sendStatus({
    variant: 'error',
    message: 'Se produjo un error desconocido',
    error: new Error('Se produjo un error desconocido'),
  })
}

const addQueryParams = (
  url: string,
  params: Record<string, string | undefined> | undefined,
): string => {
  if (!params) return url

  let queryParams = '?'
  Object.keys(params).forEach((k) => {
    if (params[k] !== undefined && params[k] !== null) {
      queryParams += `${k}=${params[k]}&`
    }
  })
  return url + queryParams.slice(0, -1) // Remove trailing '&'
}

const addQueryObject = <Q>(
  url: string,
  params:
    | { query?: Array<QueryParamType<Q>>; pager?: Pager; sort?: SortParam[] }
    | undefined,
): string => {
  if (!params) return url

  const query = createQuery(params)
  return `${url}?${query.buildQuery()}`
}

export const prepareURL = <T>(
  resourceURL: string,
  params: Query<T> | Record<string, string> | undefined = undefined,
): string => {
  if (params && ('query' in params || 'pager' in params || 'sort' in params)) {
    return encodeURI(
      addQueryObject(
        resourceURL,
        params as {
          query?: Array<QueryParamType<T>>
          pager?: Pager
          sort?: SortParam[]
        },
      ),
    )
  } else if (params) {
    return encodeURI(
      addQueryParams(resourceURL, params as Record<string, string | undefined>),
    )
  } else {
    return resourceURL
  }
}

/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status HTTP response status codes}
 */
export enum HTTPStatus {
  Continue = 100,
  SwitchingProtocol = 101,
  EarlyHints = 103,
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  PayloadTooLarge = 413,
  URITooLong = 414,
  UnsupportedMediaType = 415,
  RangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  IAmATeapot = 418,
  UnprocessableEntity = 422,
  TooEarly = 425,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HTTPVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
}

export const httpStatuses = (): Record<HTTPStatus, string> => ({
  [HTTPStatus.Continue]: 'Continue',
  [HTTPStatus.SwitchingProtocol]: 'Switching Protocol',
  [HTTPStatus.EarlyHints]: 'Early Hints',
  [HTTPStatus.OK]: 'OK',
  [HTTPStatus.Created]: 'Created',
  [HTTPStatus.Accepted]: 'Accepted',
  [HTTPStatus.NonAuthoritativeInformation]: 'Non Authoritative Information',
  [HTTPStatus.NoContent]: 'No Content',
  [HTTPStatus.ResetContent]: 'Reset Content',
  [HTTPStatus.PartialContent]: 'Partial Content',
  [HTTPStatus.MultipleChoices]: 'Multiple Choices',
  [HTTPStatus.MovedPermanently]: 'Moved Permanently',
  [HTTPStatus.Found]: 'Found',
  [HTTPStatus.SeeOther]: 'See Other',
  [HTTPStatus.NotModified]: 'Not Modified',
  [HTTPStatus.TemporaryRedirect]: 'Temporary Redirect',
  [HTTPStatus.PermanentRedirect]: 'Permanent Redirect',
  [HTTPStatus.BadRequest]: 'Bad Request',
  [HTTPStatus.Unauthorized]: 'Unauthorized',
  [HTTPStatus.PaymentRequired]: 'Payment Required',
  [HTTPStatus.Forbidden]: 'Forbidden',
  [HTTPStatus.NotFound]: 'Not Found',
  [HTTPStatus.MethodNotAllowed]: 'Method Not Allowed',
  [HTTPStatus.NotAcceptable]: 'Not Acceptable',
  [HTTPStatus.ProxyAuthenticationRequired]: 'Proxy Authentication Required',
  [HTTPStatus.RequestTimeout]: 'Request Timeout',
  [HTTPStatus.Conflict]: 'Conflict',
  [HTTPStatus.Gone]: 'Gone',
  [HTTPStatus.LengthRequired]: 'Length Required',
  [HTTPStatus.PreconditionFailed]: 'Precondition Failed',
  [HTTPStatus.PayloadTooLarge]: 'Payload Too Large',
  [HTTPStatus.URITooLong]: 'URI Too Long',
  [HTTPStatus.UnsupportedMediaType]: 'Unsupported Media Type',
  [HTTPStatus.RangeNotSatisfiable]: 'Range Not Satisfiable',
  [HTTPStatus.ExpectationFailed]: 'Expectation Failed',
  [HTTPStatus.IAmATeapot]: "I'm a teapot",
  [HTTPStatus.UnprocessableEntity]: 'Unprocessable Entity',
  [HTTPStatus.TooEarly]: 'Too Early',
  [HTTPStatus.UpgradeRequired]: 'Upgrade Required',
  [HTTPStatus.PreconditionRequired]: 'Precondition Required',
  [HTTPStatus.TooManyRequests]: 'Too Many Requests',
  [HTTPStatus.RequestHeaderFieldsTooLarge]: 'Request Header Fields Too Large',
  [HTTPStatus.UnavailableForLegalReasons]: 'Unavailable For Legal Reasons',
  [HTTPStatus.InternalServerError]: 'Internal Server Error',
  [HTTPStatus.NotImplemented]: 'Not Implemented',
  [HTTPStatus.BadGateway]: 'Bad Gateway',
  [HTTPStatus.ServiceUnavailable]: 'Service Unavailable',
  [HTTPStatus.GatewayTimeout]: 'Gateway Timeout',
  [HTTPStatus.HTTPVersionNotSupported]: 'HTTP Version Not Supported',
  [HTTPStatus.VariantAlsoNegotiates]: 'Variant Also Negotiates',
  [HTTPStatus.InsufficientStorage]: 'Insufficient Storage',
  [HTTPStatus.LoopDetected]: 'Loop Detected',
  [HTTPStatus.NotExtended]: 'Not Extended',
  [HTTPStatus.NetworkAuthenticationRequired]: 'Network Authentication Required',
})
