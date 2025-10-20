"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'

export default function EditProfilePage() {
  const router = useRouter()
  const { user, updateProfile, loading, error } = useAuth(false)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (user) setName(user.name)
  }, [user])

  if (!user) {
    return <div className="p-8">Debes iniciar sesión para editar tu perfil.</div>
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

    try {
      await updateProfile(user.id, { name, password: password || undefined } as any)
      setMessage('Perfil actualizado correctamente')
      setPassword('')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Error al actualizar')
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-emerald-200/30 animate-float" style={{ left: `${(i*11)%100}%`, top: `${(i*7)%100}%`, width: `${Math.random()*60+40}px`, height: `${Math.random()*60+40}px`, animationDelay: `${i*0.4}s` }} />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-8 py-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: Form and info */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-emerald-700">Editar perfil</h1>
                <p className="text-sm text-emerald-600">Actualiza tu información de cuenta</p>
              </div>
              <div>
                <Link href="/welcome" className="text-sm text-emerald-600 hover:underline">Volver</Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-100 shadow-sm">
              {message && <div className={`mb-4 ${message.includes('correctamente') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
              {error && <div className="mb-4 text-red-600">{error}</div>}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Nombre</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 rounded-xl border-2 border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Nueva contraseña (opcional)</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" autoComplete="new-password" className="w-full p-3 rounded-xl border-2 border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
                  <small className="block text-sm text-gray-500 mt-2">Dejar vacío para mantener la contraseña actual.</small>
                </div>

                <div className="flex justify-end gap-3 mt-2">
                  <button type="button" onClick={() => router.push('/welcome')} className="px-4 py-2 rounded-lg border-2 border-emerald-200 hover:bg-emerald-50">Cancelar</button>
                  <button type="submit" disabled={loading} className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold">{loading ? 'Procesando...' : 'Guardar'}</button>
                </div>
              </form>
            </div>

            {/* Additional sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border-2 border-emerald-100 shadow-sm">
                <p className="text-xs text-emerald-600 font-medium">Email</p>
                <p className="font-semibold text-gray-800">{user.email}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border-2 border-green-100 shadow-sm">
                <p className="text-xs text-green-600 font-medium">Rol</p>
                <p className="font-semibold text-gray-800 capitalize">{user.rol}</p>
              </div>
            </div>

            
          </section>

          {/* Right: Dino image and extras */}
          <aside className="flex flex-col items-center justify-start gap-6">
            <div className="w-full bg-white rounded-2xl p-6 border-2 border-emerald-100 shadow-sm text-center">
              <h3 className="text-lg font-semibold text-emerald-700">Tu espacio</h3>
              <p className="text-sm text-gray-600 mt-2">Personaliza tu perfil y configura tus preferencias.</p>
              <div className="mt-6">
                <button onClick={() => router.push('/welcome')} className="px-5 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold">Ir al inicio</button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/40 to-green-200/40 rounded-full blur-3xl" />
              <div className="relative p-6">
                <Image src="/dino-welcome.png" alt="Dinosaurio" width={420} height={420} className="drop-shadow-2xl" priority />
              </div>
            </div>

            
          </aside>

        </div>
      </div>
    </main>
  )
}
