import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsrInsertExternoViewModel } from './view_model/UsrInsertExternoViewModel';
import { UsrPublicoExternoViewModel } from './view_model/UsrPublicoExternoViewModel';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('name/:name')
  findbyname(@Param('name') name: string) {
    return this.usersService.findOneByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // Endpoints con ViewModels externos
  @Post('registro-externo')
  createExterno(@Body() usrInsertExterno: UsrInsertExternoViewModel) {
    return this.usersService.createExterno(usrInsertExterno);
  }

  @Patch('actualizar-externo/:id')
  updateExterno(@Param('id') id: string, @Body() usrPublicoExterno: UsrPublicoExternoViewModel) {
    return this.usersService.updateExterno(id, usrPublicoExterno);
  }
  
}
