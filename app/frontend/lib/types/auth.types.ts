/**
 * Authentication Types
 * Tipos de datos para autenticación
 */

export interface User {
  id: string // UUID
  email: string
  name: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  rol?: string
}

export interface AuthResponse {
  access_token: string
  user: User
}

export interface ApiError {
  message: string
  statusCode?: number
}
