import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDAO } from './DAO/users.dao';
import { User } from './entities/user.entity';
import { UsuariosCQRS } from './cqrs/UsuariosCQRS';

@Injectable()
export class UsersService {
  constructor(
    private readonly userDAO: UserDAO,
    private readonly usuariosCQRS: UsuariosCQRS,
  ) {}

  create(createUserDto: CreateUserDto) {
    // Pasa por CQRS antes de llegar al DAO
    return this.usuariosCQRS.insert(createUserDto);
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
  
  async update(id: string, updateUserDto: UpdateUserDto) {
    // Pasa por CQRS para validaciones y lógica antes de DAO
    return this.usuariosCQRS.update(id, updateUserDto);
  }

  remove(id: string) {
    throw new Error('Método no implementado');
  }
}
