"use client"

import React, { useState, useEffect } from 'react'
import { UsuarioPresentador } from '@/lib/presenters/UsuarioPresentador'
import { Usuario } from '@/lib/models/Usuario'

export default function ProfilePage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const presentador = new UsuarioPresentador()

  useEffect(() => {
    const cargarUsuario = async () => {
      setLoading(true)
      try {
        await presentador.validarSesion()
        const usr = presentador.getUsuario()
        setUsuario(usr)
        if (usr) setName(usr.name)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar usuario')
      } finally {
        setLoading(false)
      }
    }
    cargarUsuario()
  }, [])

  if (!usuario) {
    return <div style={{ padding: 16 }}>Debes iniciar sesión para editar tu perfil.</div>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (name.trim().length === 0) {
      setMessage('El nombre no puede estar vacío')
      return
    }
    if (name.length > 30) {
      setMessage('El nombre debe tener como máximo 30 caracteres')
      return
    }
    if (password && password.length > 0 && password.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)
    try {
      await presentador.actualizarPerfil(usuario.id, { name, password: password || undefined } as any)
      setMessage('Perfil actualizado correctamente')
      setPassword('')
      // Actualizar el usuario local
      const updatedUsr = presentador.getUsuario()
      if (updatedUsr) {
        setUsuario(updatedUsr)
        setName(updatedUsr.name)
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Error al actualizar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Editar perfil</h2>
      {message && <div style={{ color: message.includes('correctamente') ? 'green' : 'red', margin: '8px 0' }}>{message}</div>}
      {error && <div style={{ color: 'red', margin: '8px 0' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
        <label>
          Nombre
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: 8 }} />
        </label>

        <label>
          Nueva contraseña (opcional)
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
            style={{ width: '100%', padding: 8 }}
          />
          <small>Dejar vacío para mantener la contraseña actual.</small>
        </label>

        <button type="submit" disabled={loading} style={{ padding: '10px 14px' }}>
          {loading ? 'Procesando...' : 'Guardar'}
        </button>
      </form>
    </div>
  )
}
