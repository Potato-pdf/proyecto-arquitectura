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
      // Try to parse JSON error body, otherwise fallback to plain text
      let errorBody: any = null
      try {
        errorBody = await response.json()
      } catch (e) {
        try {
          const text = await response.text()
          errorBody = { message: text }
        } catch (ee) {
          errorBody = { message: 'Error en la petición' }
        }
      }

      const message = (errorBody && (errorBody.message || errorBody.error || JSON.stringify(errorBody))) || `HTTP ${response.status}`
      const err = new Error(message)
      // annotate with status for downstream handling
      ;(err as any).status = response.status
      throw err
    }

    // Parse and return JSON body
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

  async updateProfile(id: string, data: Partial<User>): Promise<User> {
    return this.request<User>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }
}

export const authApi = new AuthApiClient()
