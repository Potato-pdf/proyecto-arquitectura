import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { UserDAO } from '../DAO/users.dao';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsuariosCQRS {
  constructor(private readonly userDAO: UserDAO) {}

  private validateName(name?: string) {
    if (typeof name === 'string' && name.length > 30) {
      throw new BadRequestException('El nombre de usuario debe tener como máximo 30 caracteres');
    }
  }

  private validatePassword(password?: string) {
    if (typeof password === 'string' && password.length > 0 && password.length < 6) {
      throw new BadRequestException('La contraseña debe tener al menos 6 caracteres');
    }
  }

  async insert(user: CreateUserDto) {
    // Validaciones
    this.validateName(user.name);
    this.validatePassword(user.password);

    // Verificar existencia por email o name para evitar duplicados
    const existingByEmail = await this.userDAO.getUsuarioByEmail(user.email);
    if (existingByEmail) {
      throw new ConflictException('Ya existe un usuario con ese correo');
    }

    const existingByName = await this.userDAO.getUsuarioByName(user.name);
    if (existingByName) {
      throw new ConflictException('El nombre de usuario ya está en uso');
    }

    // Delegar al DAO
    return this.userDAO.insertUsuario(user);
  }

  async update(id: string, user: UpdateUserDto) {
    // Validaciones (solo si vienen campos)
    if (user.name !== undefined) this.validateName(user.name);
    if (user.password !== undefined) this.validatePassword(user.password);

    // Si se quiere cambiar el nombre, verificar disponibilidad
    if (user.name) {
      const existing = await this.userDAO.getUsuarioByName(user.name);
      if (existing && existing.id !== id) {
        throw new ConflictException('El nombre de usuario ya está en uso');
      }
    }

    return this.userDAO.updateUsuario(id, user as UpdateUserDto);
  }
}
