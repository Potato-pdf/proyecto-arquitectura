/**
 * UsuarioPresentador
 * Clase que maneja toda la lógica de negocio relacionada con usuarios
 */

import { authApi } from '../api/auth.api';
import { tokenStorage } from '../store/token.storage';
import { Usuario } from '../models/Usuario';
import type { LoginCredentials, RegisterData, AuthResponse } from '../types/auth.types';

export class UsuarioPresentador {
  private usuario: Usuario | null = null;
  private loading: boolean = false;
  private error: string | null = null;

  /**
   * Obtener el usuario actual
   */
  getUsuario(): Usuario | null {
    return this.usuario;
  }

  /**
   * Verificar si el usuario está autenticado
   */
  estaAutenticado(): boolean {
    return !!this.usuario;
  }

  /**
   * Obtener el estado de carga
   */
  getLoading(): boolean {
    return this.loading;
  }

  /**
   * Obtener el error actual
   */
  getError(): string | null {
    return this.error;
  }

  /**
   * Validar la sesión del usuario
   */
  async validarSesion(): Promise<void> {
    const token = tokenStorage.getToken();

    if (!token) {
      return;
    }

    this.loading = true;
    try {
      const profile = await authApi.getProfile();
      this.usuario = new Usuario(profile.id, profile.email, profile.name, (profile as any).rol);
      this.error = null;
    } catch (err) {
      tokenStorage.removeToken();
      this.usuario = null;
      // No mostrar error, es normal que expire
    } finally {
      this.loading = false;
    }
  }

  /**
   * Iniciar sesión
   */
  async iniciarSesion(credenciales: LoginCredentials): Promise<AuthResponse> {
    this.loading = true;
    this.error = null;

    try {
      console.log('🔐 Intentando login con:', credenciales.email);
      const response = await authApi.login(credenciales);
      console.log('✅ Respuesta del login:', response);

      if (!response.access_token) {
        throw new Error('No se recibió el token de acceso');
      }

      console.log('💾 Guardando token en localStorage...');
      tokenStorage.setToken(response.access_token);

      // Verificar que se guardó
      const savedToken = tokenStorage.getToken();
      console.log('✅ Token guardado:', savedToken ? 'SÍ' : 'NO');

      this.usuario = new Usuario(response.user.id, response.user.email, response.user.name, (response.user as any).rol);
      return response;
    } catch (err) {
      console.error('❌ Error en login:', err);
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      this.error = message;
      throw err;
    } finally {
      this.loading = false;
    }
  }

  /**
   * Registrarse
   */
  async registrarse(datos: RegisterData): Promise<AuthResponse> {
    this.loading = true;
    this.error = null;

    try {
      // Validaciones cliente adicionales
      if (!datos.name || datos.name.trim().length === 0) {
        throw new Error('El nombre es obligatorio');
      }
      if (datos.name.length > 30) {
        throw new Error('El nombre debe tener como máximo 30 caracteres');
      }
      if (!datos.password || datos.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      const response = await authApi.register(datos);
      tokenStorage.setToken(response.access_token);
      this.usuario = new Usuario(response.user.id, response.user.email, response.user.name, (response.user as any).rol);
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrarse';
      this.error = message;
      throw err;
    } finally {
      this.loading = false;
    }
  }

  /**
   * Actualizar perfil
   */
  async actualizarPerfil(id: string, datos: Partial<Usuario> & { password?: string }): Promise<Usuario> {
    this.loading = true;
    this.error = null;
    try {
      if (datos.name !== undefined) {
        if (datos.name.trim().length === 0) {
          throw new Error('El nombre no puede estar vacío');
        }
        if (datos.name.length > 30) {
          throw new Error('El nombre debe tener como máximo 30 caracteres');
        }
      }
      if (datos.password !== undefined && datos.password !== '' && datos.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }
      const updatedUser = await authApi.updateProfile(id, datos);
      this.usuario = new Usuario(updatedUser.id, updatedUser.email, updatedUser.name, (updatedUser as any).rol);
      return this.usuario;
    } catch (err) {
      // Map common DB/backend errors
      let message = err instanceof Error ? err.message : String(err || 'Error al actualizar el perfil');
      const lower = message.toLowerCase();

      if (/key\s*\(email\)|email\).*already exists|duplicate key value.*\be?mail\b/i.test(message) || /already exists/.test(lower) && lower.includes('email')) {
        message = 'El email ya está en uso';
      } else if (/key\s*\(name\)|name\).*already exists|duplicate key value.*\bname\b/i.test(message) || /already exists/.test(lower) && lower.includes('name')) {
        message = 'El nombre ya está en uso';
      } else if (/duplicate key/i.test(message) || /unique constraint/i.test(lower)) {
        if (lower.includes('email')) message = 'El email ya está en uso';
        else if (lower.includes('name')) message = 'El nombre ya está en uso';
        else message = 'Ya existe un registro con los mismos datos';
      }

      this.error = message;
      throw new Error(message);
    } finally {
      this.loading = false;
    }
  }

  /**
   * Cerrar sesión
   */
  cerrarSesion(): void {
    tokenStorage.removeToken();
    this.usuario = null;
    this.loading = false;
    this.error = null;
  }

  /**
   * Limpiar error
   */
  limpiarError(): void {
    this.error = null;
  }
}