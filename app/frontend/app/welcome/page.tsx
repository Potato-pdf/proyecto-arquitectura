"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link" // Importar Link
import { tokenStorage } from "@/lib/store/token.storage"
import { authApi } from "@/lib/api/auth.api"

export default function WelcomePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const validateSession = async () => {
      const token = tokenStorage.getToken()
      
      if (!token) {
        router.replace('/')
        return
      }

      try {
        const profile = await authApi.getProfile()
        setUser(profile)
      } catch (error) {
        tokenStorage.removeToken()
        router.replace('/')
      } finally {
        setLoading(false)
      }
    }

    validateSession()
  }, [router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-200/30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-8 py-12">
        <div className={`max-w-6xl w-full transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Welcome badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border-2 border-emerald-300 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-emerald-700 font-medium">Sesión activa</span>
            </div>
          </div>

          {/* Grid layout for content and image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left side - Content */}
            <div className="text-center lg:text-left space-y-6">
              
              {/* Main title with gradient */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent tracking-tight animate-gradient-x leading-tight pb-2">
                BIENVENIDO
              </h1>
              
              {/* User name with animated underline */}
              <div className="relative inline-block w-full">
                <p className="text-4xl md:text-5xl font-light text-emerald-900 animate-fade-in-delay-1">
                  {user.name}
                </p>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-shimmer"></div>
              </div>

              {/* User info cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 animate-fade-in-delay-2">
                <div className="group p-6 rounded-2xl bg-white border-2 border-emerald-200 hover:border-emerald-400 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition-colors">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-emerald-600 font-medium">Email</p>
                      <p className="text-sm text-gray-800 font-semibold">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="group p-6 rounded-2xl bg-white border-2 border-green-200 hover:border-green-400 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-green-600 font-medium">Rol</p>
                      <p className="text-sm text-gray-800 font-semibold capitalize">{user.rol}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-left pt-4 animate-fade-in-delay-2">
                <Link href="/edit-profile" className="text-emerald-600 hover:underline inline-block">Editar Perfil</Link>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-fade-in-delay-3">
                <button
                  onClick={() => {
                    // Navegar al dashboard
                  }}
                  className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Mi Dashboard
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>

                <button
                  onClick={() => {
                    tokenStorage.removeToken()
                    router.push('/')
                  }}
                  className="group relative px-8 py-4 rounded-xl bg-white border-2 border-emerald-300 text-emerald-700 font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-emerald-50"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 group-hover:-rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Cerrar Sesión
                  </span>
                </button>
              </div>
            </div>

            {/* Right side - Dinosaur image */}
            <div className="flex justify-center lg:justify-end animate-fade-in-delay-2">
              <div className="relative">
                {/* Decorative circle behind dino */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/40 to-green-200/40 rounded-full blur-3xl animate-pulse-slow"></div>
                
                {/* Dino image */}
                <div className="relative animate-bounce-slow">
                  <Image
                    src="/dino-welcome.png"
                    alt="Dinosaurio de bienvenida"
                    width={500}
                    height={500}
                    className="relative z-10 drop-shadow-2xl"
                    priority
                  />
                  
                  {/* Sparkles around dino */}
                  <div className="absolute top-10 right-10 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
                  <div className="absolute top-20 left-10 w-3 h-3 bg-green-400 rounded-full animate-ping animation-delay-1000"></div>
                  <div className="absolute bottom-32 right-20 w-2 h-2 bg-teal-400 rounded-full animate-ping animation-delay-2000"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer info */}
          <div className="mt-12 text-center text-xs text-emerald-600/60 animate-fade-in-delay-4">
            <p>ID de sesión: {user.id.substring(0, 8)}...</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-25px) translateX(15px);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fade-in-delay-1 {
          animation: fadeIn 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-3 {
          animation: fadeIn 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }

        .animate-fade-in-delay-4 {
          animation: fadeIn 0.8s ease-out 0.8s forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  )
}
