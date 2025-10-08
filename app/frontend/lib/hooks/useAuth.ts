/**
 * useAuth Hook
 * Hook personalizado para manejar la autenticación
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { authApi } from '../api/auth.api'
import { tokenStorage } from '../store/token.storage'
import type { User, LoginCredentials, RegisterData } from '../types/auth.types'

export function useAuth(skipValidation = false) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const validateSession = useCallback(async () => {
    const token = tokenStorage.getToken()
    
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const profile = await authApi.getProfile(token)
      setUser(profile)
    } catch (err) {
      // Token inválido, eliminarlo
      tokenStorage.removeToken()
      setUser(null)
      // No mostrar error en consola, es normal que expire
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!skipValidation) {
      const token = tokenStorage.getToken()
      if (token) {
        validateSession()
      } else {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [validateSession, skipValidation])

  const login = async (credentials: LoginCredentials) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await authApi.login(credentials)
      tokenStorage.setToken(response.access_token)
      setUser(response.user)
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (data: RegisterData) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await authApi.register(data)
      tokenStorage.setToken(response.access_token)
      setUser(response.user)
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrarse'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    tokenStorage.removeToken()
    setUser(null)
  }

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }
}
