import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDAO } from './DAO/users.dao';
import { User } from './entities/user.entity';
import { UsuariosCQRS } from './cqrs/UsuariosCQRS';
import { UsrInsertExternoViewModel } from './view_model/UsrInsertExternoViewModel';
import { UsrPublicoExternoViewModel } from './view_model/UsrPublicoExternoViewModel';

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

  async createExterno(usrInsertExterno: UsrInsertExternoViewModel) {
    if (usrInsertExterno.Pss !== usrInsertExterno.PssConfirmacion) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const createUserDto: CreateUserDto = {
      email: usrInsertExterno.Usr,
      password: usrInsertExterno.Pss,
      name: usrInsertExterno.Usr.split('@')[0],
      rol: 'user',
    };

    const newUser = await this.usuariosCQRS.insert(createUserDto);

    const response: UsrPublicoExternoViewModel = {
      Identificador: newUser.id,
      Usr: newUser.email,
    };

    return response;
  }

  async updateExterno(id: string, usrPublicoExterno: UsrPublicoExternoViewModel) {
    const updateUserDto: UpdateUserDto = {
      email: usrPublicoExterno.Usr,
      name: usrPublicoExterno.Usr.split('@')[0],
    };

    const updatedUser = await this.usuariosCQRS.update(id, updateUserDto);

    const response: UsrPublicoExternoViewModel = {
      Identificador: usrPublicoExterno.Identificador,
      Usr: updatedUser.email,
    };
    console.log(response.Usr)
    return response;
  }
}
