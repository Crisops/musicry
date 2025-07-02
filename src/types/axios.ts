export interface ApiResponse<T = any> {
  success: true
  data: T
  status: number
  message: string
}

export interface ApiError {
  success: false
  error: {
    message: string
    status?: number
    data?: any
    type?: 'network' | 'config' | 'server'
  }
}

export type ApiResult<T = any> = ApiResponse<T> | ApiError

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface ApiClientOptions {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
}
