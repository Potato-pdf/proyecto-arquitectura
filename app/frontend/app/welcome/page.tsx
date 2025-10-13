"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { tokenStorage } from "@/lib/store/token.storage"
import { authApi } from "@/lib/api/auth.api"

export default function WelcomePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const token = tokenStorage.getToken()
    if (!token) {
      router.push('/')
      return
    }

    // Validar token manualmente
    const validateToken = async () => {
      try {
        const profile = await authApi.getProfile(token)
        setUser(profile)
        setIsChecking(false)
      } catch (error) {
        console.error('Error validando token:', error)
        tokenStorage.removeToken()
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    validateToken()
  }, [mounted, router])

  if (!mounted || loading || isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-2xl font-light text-black">Cargando...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-8">
      <div className="max-w-4xl text-center space-y-12">
        <h1 className="text-6xl md:text-8xl font-bold text-black tracking-tight">
          BIENVENIDO
        </h1>
        
        <p className="text-3xl md:text-4xl font-light text-black">
          {user.name}
        </p>

        <div className="pt-8">
          <Image
            src="/dino-welcome.png"
            alt="Dinosaurio de bienvenida"
            width={600}
            height={600}
            className="mx-auto"
            priority
          />
        </div>

        <button
          onClick={() => {
            tokenStorage.removeToken()
            router.push('/')
          }}
          className="mt-8 px-8 py-4 text-xl font-light text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-300"
        >
          Cerrar Sesión
        </button>
      </div>
    </main>
  )
}
