import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findOneByEmail(registerDto.email);
    
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }
    // No hashear aquí: el DAO es el responsable de hashear la contraseña
    const user: User = await this.usersService.create({
      ...registerDto,
      rol: 'user',
    } as any);

    const { password: _, ...userWithoutPassword } = user;
    const payload = { sub: userWithoutPassword.id, email: userWithoutPassword.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: userWithoutPassword,
    };
  }

  async login(loginDto: LoginDto) {
    const user: User | null = await this.usersService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user!.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar si el usuario está activo
    if (!user!.isActive) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    // Generar token
    const payload = { sub: user!.id, email: user!.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        rol: user.rol,
      },
    };
  }

  async validateUser(email: string): Promise<Partial<User> | null> {
    const user: User | null = await this.usersService.findOneByEmail(email);
    
    if (!user || !user.isActive) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      rol: user.rol,
    };
  }
}
