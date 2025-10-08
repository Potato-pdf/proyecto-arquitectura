/**
 * Authentication Types
 * Tipos de datos para autenticación
 */

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthResponse {
  access_token: string
  user: User
}

export interface ApiError {
  message: string
  statusCode?: number
}
