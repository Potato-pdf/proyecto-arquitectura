/**
 * Token Storage
 * Abstracción para el manejo de tokens en localStorage
 */

const TOKEN_KEY = 'auth_token'

export const tokenStorage = {
  getToken(): string | null {
    if (typeof window === 'undefined') {
      console.log('⚠️ getToken: window no disponible (SSR)')
      return null
    }
    const token = localStorage.getItem(TOKEN_KEY)
    console.log('📖 getToken:', token ? `Token encontrado (${token.substring(0, 20)}...)` : 'No hay token')
    return token
  },

  setToken(token: string): void {
    if (typeof window === 'undefined') {
      console.log('⚠️ setToken: window no disponible (SSR)')
      return
    }
    console.log('💾 setToken: Guardando token...', token.substring(0, 20) + '...')
    localStorage.setItem(TOKEN_KEY, token)
    
    // Verificar que se guardó correctamente
    const saved = localStorage.getItem(TOKEN_KEY)
    console.log('✅ setToken: Token guardado:', saved ? 'SÍ' : 'NO')
  },

  removeToken(): void {
    if (typeof window === 'undefined') {
      console.log('⚠️ removeToken: window no disponible (SSR)')
      return
    }
    console.log('🗑️ removeToken: Eliminando token...')
    localStorage.removeItem(TOKEN_KEY)
  },
}
