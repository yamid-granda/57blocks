interface SuccessApiRes<Result> {
  isOk: true
  result: Result
}

interface ApiResError {
  message: string
  code?: string
  name?: 'AbortError'
}

interface ErrorApiRes {
  isOk: false
  error?: ApiResError
}

export type ApiRes<Result> = SuccessApiRes<Result> | ErrorApiRes

export interface HttpReqConfig {
  config?: RequestInit
  type?: 'json'
  params?: HttpReqParams
}

interface HttpReqParams {
  limit?: number
  offset?: number
}

const BASE_URL = 'https://pokeapi.co/api/v2'

async function httpRequest<Result>(path: string, config: HttpReqConfig): Promise<ApiRes<Result>> {
  let strSearchParams = ''

  if (config.params)
    strSearchParams = `?${new URLSearchParams(config.params as Record<string, string>).toString()}`

  try {
    const url = `${BASE_URL}${path}${strSearchParams}`
    const res = await fetch(url, config.config)
    const resType = config.type || 'json'
    const result = await res[resType]()

    return {
      isOk: true,
      result,
    }
  }
  catch (error) {
    const responseError = error as ApiResError

    return {
      isOk: false,
      error: responseError,
    }
  }
}

export async function httpGet<Result>(path: string, config: HttpReqConfig): Promise<ApiRes<Result>> {
  return httpRequest(path, {
    ...config,
    config: {
      ...config.config,
      method: 'GET',
    },
  })
}
