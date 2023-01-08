import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Role } from './role.entity';
import { RoleInput } from './role.input';
import { RoleService } from './role.service';
import { RoleUpdate } from './role.update';

@UseGuards(AuthGuard('jwt'))
@Controller('roles')
@ApiTags('roles')
export class RoleController {
  constructor(private service: RoleService) {}

  @Post()
  async create(@Body() role: RoleInput): Promise<Role> {
    return await this.service.create(role);
  }
  @Delete(':user/:asso')
  async delete(
    @Param('user', ParseIntPipe) user: number,
    @Param('asso', ParseIntPipe) asso: number,
  ): Promise<boolean> {
    return await this.service.delete(user, asso);
  }
  @Put(':user/:asso')
  async update(
    @Param('user', ParseIntPipe) user: number,
    @Param('asso', ParseIntPipe) asso: number,
    @Body() role: RoleUpdate,
  ) {
    return await this.service.update(user, asso, role);
  }
  @Get()
  async getAll(): Promise<Role[]> {
    return await this.service.getAll();
  }
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return await this.service.getById(id);
  }
  @Get('userid/:id')
  async getByUserId(@Param('id', ParseIntPipe) id: number): Promise<Role[]> {
    return await this.service.getByUserId(id);
  }
  @Get('users/:name')
  async getUsersByRoleName(@Param('name') name: string): Promise<User[]> {
    return await this.service.getUsersByName(name);
  }
  @Get('association/:id')
  async getByAsso(@Param('id', ParseIntPipe) id: number): Promise<Role[]> {
    return await this.service.getByAsso(id);
  }
  @Get(':user/:asso')
  async getByUserAndAsso(
    @Param('user', ParseIntPipe) user: number,
    @Param('asso', ParseIntPipe) asso: number,
  ): Promise<Role> {
    return await this.service.getByUserAndAsso(user, asso);
  }
}
