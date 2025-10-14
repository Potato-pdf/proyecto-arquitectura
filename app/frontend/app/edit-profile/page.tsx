'use client';

import ProfileEditForm from '@/components/profile-edit-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { useEffect } from 'react';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth'); // Redirigir a login si no está autenticado
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return null; // O mostrar un mensaje de "Acceso denegado"
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <ProfileEditForm onSuccess={() => router.push('/welcome')} />
    </div>
  );
}