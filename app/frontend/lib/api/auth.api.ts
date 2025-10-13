/**
 * Auth API Client
 * Cliente HTTP para endpoints de autenticación
 */

import { API_CONFIG } from './config'
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../types/auth.types'
import { tokenStorage } from '../store/token.storage'

export class AuthApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_CONFIG.baseURL}${endpoint}`
    
    // Obtener el token del almacenamiento usando tokenStorage
    const token = tokenStorage.getToken()
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'Error en la petición',
      }))
      throw new Error(error.message || 'Error desconocido')
    }

    return response.json()
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getProfile(): Promise<User> {
    return this.request<User>('/auth/profile', {
      method: 'GET',
    })
  }

  async validateToken(): Promise<{ valid: boolean }> {
    return this.request<{ valid: boolean }>('/auth/validate', {
      method: 'GET',
    })
  }
}

export const authApi = new AuthApiClient()
