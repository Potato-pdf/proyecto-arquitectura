/**
 * Modelo Usuario
 * Clase que representa a un usuario en el sistema
 */
export class Usuario {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public rol?: string
  ) {}

  /**
   * Método para actualizar el nombre del usuario
   */
  actualizarNombre(nuevoNombre: string): void {
    if (!nuevoNombre || nuevoNombre.trim().length === 0) {
      throw new Error('El nombre no puede estar vacío');
    }
    if (nuevoNombre.length > 30) {
      throw new Error('El nombre debe tener como máximo 30 caracteres');
    }
    this.name = nuevoNombre;
  }

  /**
   * Método para actualizar el email del usuario
   */
  actualizarEmail(nuevoEmail: string): void {
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(nuevoEmail)) {
      throw new Error('El email no tiene un formato válido');
    }
    this.email = nuevoEmail;
  }

  /**
   * Método para obtener los datos del usuario como objeto
   */
  toObject() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      rol: this.rol
    };
  }
}