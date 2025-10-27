"use client"

import { useEffect, useState } from 'react';
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
        const response = await fetch('http://localhost:3000/users', {
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
    return <div className="p-8">Cargando usuarios...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  if (!usuarios) {
    return <div className="p-8">No se pudieron cargar los usuarios.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Lista de Usuarios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Usuarios Locales */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Usuarios Locales</h2>
          <div className="space-y-4">
            {usuarios.locales.map((usuario) => (
              <div key={usuario.id} className="p-4 border rounded-lg shadow">
                <p><strong>ID:</strong> {usuario.id}</p>
                <p><strong>Nombre:</strong> {usuario.name}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Rol:</strong> {usuario.rol || 'N/A'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Usuarios Externos */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Usuarios Externos</h2>
          <div className="space-y-4">
            {usuarios.externos.map((usuario) => (
              <div key={usuario.id} className="p-4 border rounded-lg shadow">
                <p><strong>ID:</strong> {usuario.id}</p>
                <p><strong>Nombre:</strong> {usuario.name}</p>
                <p><strong>Email:</strong> {usuario.mail}</p>
                <p><strong>Contraseña (hash):</strong> {usuario.password}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}