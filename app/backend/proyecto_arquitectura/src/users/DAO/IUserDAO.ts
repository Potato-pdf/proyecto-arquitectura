import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface IUserDAO {
    getUsuarios(): Promise<any[]>;
    getUsuarioById(id: string): Promise<any>;
    getUsuarioByName(name: string): Promise<User | null>;
    getUsuarioByEmail(email: string): Promise<User | null>;
    insertUsuario(createUserDto: CreateUserDto): Promise<any>;
    updateUsuario(id: string, updateUserDto: UpdateUserDto): Promise<any>;
}