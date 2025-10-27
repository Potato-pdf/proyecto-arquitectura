"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UsuarioPresentador } from '@/lib/presenters/UsuarioPresentador';

interface UsuarioLocal {
  id: string;
  email: string;
  name: string;
  rol?: string;
}

interface UsuarioExterno {
  id: string;
  name: string;
  mail: string;
  password: string;
}

interface UsuariosResponse {
  locales: UsuarioLocal[];
  externos: UsuarioExterno[];
}

export default function UsersPage() {
  const [usuarios, setUsuarios] = useState<UsuariosResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'locales' | 'externos'>('locales');

  const presentador = new UsuarioPresentador();

  useEffect(() => {
    const cargarUsuarios = async () => {
      setLoading(true);
      try {
        // Validar sesión
        await presentador.validarSesion();
        const usuarioActual = presentador.getUsuario();
        if (!usuarioActual) {
          setError('Debes iniciar sesión para ver los usuarios');
          setLoading(false);
          return;
        }

        // Llamar al backend que integra APIs
        const response = await fetch('http://localhost:3000/deno/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Incluir token si es necesario
          },
        });

        if (!response.ok) {
          throw new Error('Error al cargar usuarios');
        }

        const data: UsuariosResponse = await response.json();
        setUsuarios(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    cargarUsuarios();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="text-red-500 text-center">
          <p>Error: {error}</p>
          <Link href="/welcome" className="text-emerald-600 hover:underline mt-4 inline-block">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  if (!usuarios) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <p>No se pudieron cargar los usuarios.</p>
      </div>
    );
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
        <div className="max-w-6xl w-full">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent tracking-tight">
                Lista de Usuarios
              </h1>
              <p className="text-sm text-emerald-600 mt-2">Usuarios locales y externos integrados</p>
            </div>
            <Link href="/welcome" className="text-emerald-600 hover:underline">Volver al inicio</Link>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl p-2 border-2 border-emerald-200 shadow-sm">
              <button
                onClick={() => setActiveTab('locales')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'locales'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                Usuarios Locales ({usuarios.locales.length})
              </button>
              <button
                onClick={() => setActiveTab('externos')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'externos'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                Usuarios Externos ({usuarios.externos.length})
              </button>
            </div>
          </div>

          {/* Content based on tab */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'locales' ? (
              usuarios.locales.map((usuario) => (
                <div key={usuario.id} className="bg-white rounded-2xl p-6 border-2 border-emerald-200 shadow-sm hover:shadow-lg transition-all hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-full bg-emerald-100">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-emerald-600 font-medium">Usuario Local</p>
                      <p className="font-semibold text-gray-800">{usuario.name}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p><strong>ID:</strong> {usuario.id.substring(0, 8)}...</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                    <p><strong>Rol:</strong> {usuario.rol || 'N/A'}</p>
                  </div>
                </div>
              ))
            ) : (
              usuarios.externos.map((usuario) => (
                <div key={usuario.id} className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-sm hover:shadow-lg transition-all hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-full bg-green-100">
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-green-600 font-medium">Usuario Externo</p>
                      <p className="font-semibold text-gray-800">{usuario.name}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p><strong>ID:</strong> {usuario.id.substring(0, 8)}...</p>
                    <p><strong>Email:</strong> {usuario.mail}</p>
                    <p><strong>Contraseña:</strong> {usuario.password.substring(0, 10)}...</p>
                  </div>
                </div>
              ))
            )}
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

        .animate-float {
          animation: float linear infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}