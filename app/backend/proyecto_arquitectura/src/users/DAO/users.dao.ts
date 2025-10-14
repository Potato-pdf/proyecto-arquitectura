import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserDAO } from './IUserDAO';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserDAO implements IUserDAO {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsuarios(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'email', 'name', 'rol', 'password', 'isActive'],
    });
  }

  async getUsuarioById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'name', 'rol', 'password', 'isActive'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return user;
  }

  async getUsuarioByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'rol', 'password', 'isActive'],
    });
  }

  async getUsuarioByName(name: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { name },
      select: ['id', 'email', 'name', 'rol', 'password', 'isActive'],
    });
  }

  async insertUsuario(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
      rol: userData.rol || 'user',
    });

    const savedUser = await this.userRepository.save(user);
    // No excluir la contraseña aquí, ya que se necesita para la validación en auth.service.ts
    return savedUser;
  }

  async updateUsuario(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { password, ...updateData } = updateUserDto;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData['password'] = hashedPassword;
    }

    const updateResult = await this.userRepository.update(id, updateData);

    if (updateResult.affected === 0) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    const updatedUser = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'name', 'rol', 'password', 'isActive'],
    });

    if (!updatedUser) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return updatedUser;
  }
}
