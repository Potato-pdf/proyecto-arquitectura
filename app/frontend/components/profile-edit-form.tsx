import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/hooks/useAuth';
import { User } from '@/lib/types/auth.types';

interface ProfileEditFormProps {
  onSuccess?: () => void;
}

export default function ProfileEditForm({ onSuccess }: ProfileEditFormProps) {
  const { user, loading, error, updateProfile } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const nameParts = user.name ? user.name.split(' ') : ['', ''];
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (newPassword && newPassword !== confirmNewPassword) {
      setFormError('Las nuevas contraseñas no coinciden.');
      return;
    }

    try {
      const updateData: Partial<User> = {
        name: `${firstName} ${lastName}`.trim(),
        email: email,
      };

      if (newPassword) {
        // Aquí deberías tener un campo para la contraseña actual para validación en el backend
        // Por simplicidad, lo omitimos en el frontend, pero es CRÍTICO para la seguridad.
        // updateData.currentPassword = currentPassword;
        // updateData.password = newPassword;
        // Para este ejemplo, solo actualizaremos el nombre y email.
        setFormError('La actualización de contraseña no está implementada en este formulario.');
        return;
      }

      await updateProfile(user!.id, updateData);
      onSuccess?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar el perfil';
      setFormError(message);
    }
  };

  if (loading) {
    return <div>Cargando perfil...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return <div className="text-red-500">No se pudo cargar la información del usuario.</div>;
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-background" suppressHydrationWarning>
      <div className="relative w-full h-full flex items-center justify-center px-8 md:px-16 lg:px-20" suppressHydrationWarning>
        <div className="space-y-10 w-full max-w-2xl" suppressHydrationWarning>
          <div className="space-y-4 text-center" suppressHydrationWarning>
            <h1 className="font-sans text-5xl font-extralight tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Editar Perfil
            </h1>
            <p className="font-sans text-base font-light tracking-wide text-muted-foreground md:text-lg">
              Actualiza tu información personal
            </p>
            {(formError || error) && (
              <p className="font-sans text-sm font-normal text-red-500 bg-red-50 dark:bg-red-950/20 py-2 px-4 rounded">
                {formError || error}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8" suppressHydrationWarning>
            <div className="space-y-3">
              <Label htmlFor="firstName" className="font-sans text-base font-light tracking-wide text-foreground">
                Nombre
              </Label>
              <div className="relative">
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField(null)}
                  className="border-0 border-b-3 border-border bg-transparent px-0 py-4 font-sans text-lg font-light tracking-wide text-foreground transition-colors focus-visible:border-accent focus-visible:ring-0"
                  placeholder="Tu nombre"
                  required
                />
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-accent transition-all duration-300 ${
                    focusedField === 'firstName' ? 'w-full' : 'w-0'
                  }`}
                  style={{
                    boxShadow: focusedField === 'firstName' ? '0 0 12px rgba(88, 166, 255, 0.4)' : 'none',
                  }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="lastName" className="font-sans text-base font-light tracking-wide text-foreground">
                Apellido
              </Label>
              <div className="relative">
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField(null)}
                  className="border-0 border-b-3 border-border bg-transparent px-0 py-4 font-sans text-lg font-light tracking-wide text-foreground transition-colors focus-visible:border-accent focus-visible:ring-0"
                  placeholder="Tu apellido"
                  required
                />
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-accent transition-all duration-300 ${
                    focusedField === 'lastName' ? 'w-full' : 'w-0'
                  }`}
                  style={{
                    boxShadow: focusedField === 'lastName' ? '0 0 12px rgba(88, 166, 255, 0.4)' : 'none',
                  }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="email" className="font-sans text-base font-light tracking-wide text-foreground">
                Correo electrónico
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="border-0 border-b-3 border-border bg-transparent px-0 py-4 font-sans text-lg font-light tracking-wide text-foreground transition-colors focus-visible:border-accent focus-visible:ring-0"
                  placeholder="tu@email.com"
                  required
                />
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-accent transition-all duration-300 ${
                    focusedField === 'email' ? 'w-full' : 'w-0'
                  }`}
                  style={{
                    boxShadow: focusedField === 'email' ? '0 0 12px rgba(88, 166, 255, 0.4)' : 'none',
                  }}
                />
              </div>
            </div>

            {/* Campos de contraseña (opcional) */}
            {/* <div className="space-y-3">
              <Label htmlFor="currentPassword" className="font-sans text-base font-light tracking-wide text-foreground">
                Contraseña Actual
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  onFocus={() => setFocusedField('currentPassword')}
                  onBlur={() => setFocusedField(null)}
                  className="border-0 border-b-3 border-border bg-transparent px-0 py-4 font-sans text-lg font-light tracking-wide text-foreground transition-colors focus-visible:border-accent focus-visible:ring-0"
                  placeholder="••••••••"
                />
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-accent transition-all duration-300 ${
                    focusedField === 'currentPassword' ? 'w-full' : 'w-0'
                  }`}
                  style={{
                    boxShadow: focusedField === 'currentPassword' ? '0 0 12px rgba(88, 166, 255, 0.4)' : 'none',
                  }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="newPassword" className="font-sans text-base font-light tracking-wide text-foreground">
                Nueva Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onFocus={() => setFocusedField('newPassword')}
                  onBlur={() => setFocusedField(null)}
                  className="border-0 border-b-3 border-border bg-transparent px-0 py-4 font-sans text-lg font-light tracking-wide text-foreground transition-colors focus-visible:border-accent focus-visible:ring-0"
                  placeholder="••••••••"
                />
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-accent transition-all duration-300 ${
                    focusedField === 'newPassword' ? 'w-full' : 'w-0'
                  }`}
                  style={{
                    boxShadow: focusedField === 'newPassword' ? '0 0 12px rgba(88, 166, 255, 0.4)' : 'none',
                  }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="confirmNewPassword" className="font-sans text-base font-light tracking-wide text-foreground">
                Confirmar Nueva Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="confirmNewPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirmNewPassword')}
                  onBlur={() => setFocusedField(null)}
                  className="border-0 border-b-3 border-border bg-transparent px-0 py-4 font-sans text-lg font-light tracking-wide text-foreground transition-colors focus-visible:border-accent focus-visible:ring-0"
                  placeholder="••••••••"
                />
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-accent transition-all duration-300 ${
                    focusedField === 'confirmNewPassword' ? 'w-full' : 'w-0'
                  }`}
                  style={{
                    boxShadow: focusedField === 'confirmNewPassword' ? '0 0 12px rgba(88, 166, 255, 0.4)' : 'none',
                  }}
                />
              </div>
            </div> */}

            <Button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden bg-foreground py-7 font-sans text-lg font-light tracking-wide text-background transition-all hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">
                {loading ? 'Guardando...' : 'Actualizar Perfil'}
              </span>
              <div className="absolute inset-0 z-0 bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}