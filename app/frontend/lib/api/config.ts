/**
 * API Configuration
 * Configuración centralizada de la API
 */

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/deno',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
}
