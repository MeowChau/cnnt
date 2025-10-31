export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface PaginationParams {
  page: number
  limit: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export type ErrorResponse = {
  message: string
  code?: string
  details?: Record<string, string[]>
}
