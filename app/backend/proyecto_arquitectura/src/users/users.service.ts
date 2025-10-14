import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDAO } from './DAO/users.dao';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userDAO: UserDAO) {}

  create(createUserDto: CreateUserDto) {
    return this.userDAO.insertUsuario(createUserDto);
  }

  findAll() {
    return this.userDAO.getUsuarios();
  }

  findOne(id: string) {
    return this.userDAO.getUsuarioById(id);
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userDAO.getUsuarioByEmail(email);
  }

  findOneByName(name: string) {
    return this.userDAO.getUsuarioByName(name);
  }
  
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userDAO.updateUsuario(id, updateUserDto);
  }

  remove(id: string) {
    throw new Error('Método no implementado');
  }
}
