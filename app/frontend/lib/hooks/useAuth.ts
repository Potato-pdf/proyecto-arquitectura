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
      const profile = await authApi.getProfile()
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
      console.log('🔐 Intentando login con:', credentials.email)
      const response = await authApi.login(credentials)
      console.log('✅ Respuesta del login:', response)
      
      if (!response.access_token) {
        throw new Error('No se recibió el token de acceso')
      }
      
      console.log('💾 Guardando token en localStorage...')
      tokenStorage.setToken(response.access_token)
      
      // Verificar que se guardó
      const savedToken = tokenStorage.getToken()
      console.log('✅ Token guardado:', savedToken ? 'SÍ' : 'NO')
      
      setUser(response.user)
      return response
    } catch (err) {
      console.error('❌ Error en login:', err)
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
      // Validaciones cliente adicionales
      if (!data.name || data.name.trim().length === 0) {
        throw new Error('El nombre es obligatorio')
      }
      if (data.name.length > 30) {
        throw new Error('El nombre debe tener como máximo 30 caracteres')
      }
      if (!data.password || data.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres')
      }
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

  const updateProfile = async (id: string, data: Partial<User> & { password?: string }) => {
    setLoading(true);
    setError(null);
    try {
      if (data.name !== undefined) {
        if (data.name.trim().length === 0) {
          throw new Error('El nombre no puede estar vacío')
        }
        if (data.name.length > 30) {
          throw new Error('El nombre debe tener como máximo 30 caracteres')
        }
      }
      if (data.password !== undefined && data.password !== '' && data.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres')
      }
      const updatedUser = await authApi.updateProfile(id, data);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar el perfil';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    tokenStorage.removeToken()
    setUser(null)
    setLoading(false)
  }

  return {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
    error,
    isAuthenticated: !!user,
  }
}
