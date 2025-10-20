import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UserDAO } from './DAO/users.dao';
import { UsuariosCQRS } from './cqrs/UsuariosCQRS';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserDAO, UsuariosCQRS],
  exports: [UsersService, UserDAO, UsuariosCQRS],
})
export class UsersModule {}
