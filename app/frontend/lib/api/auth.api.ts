/**
 * Auth API Client
 * Cliente HTTP para endpoints de autenticación
 */

import { API_CONFIG } from './config'
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../types/auth.types'

export class AuthApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_CONFIG.baseURL}${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...API_CONFIG.headers,
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

  async getProfile(token: string): Promise<User> {
    return this.request<User>('/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  async validateToken(token: string): Promise<{ valid: boolean }> {
    return this.request<{ valid: boolean }>('/auth/validate', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}

export const authApi = new AuthApiClient()
