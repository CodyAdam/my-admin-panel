import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './role.entity';
import { RoleInput } from './role.input';
import { RoleService } from './role.service';
import { RoleUpdate } from './role.update';

@UseGuards(AuthGuard('jwt'))
@Controller('role')
export class RoleController {
    constructor(
        private service: RoleService
    ){}

    @Post()
    async create(@Body() role: RoleInput): Promise<Role>{
        return await this.service.create(role)
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean>{
        return await this.service.delete(id)
    }
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, role: RoleUpdate){
        return await this.service.update(id, role)
    }
    @Get()
    async getAll(): Promise<Role[]>{
        return await this.service.getAll()
    }
    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<Role>{
        return await this.service.getById(id)
    }
    @Get(':user/:asso')
    async getByUserAndAsso(@Param('user', ParseIntPipe) user: number, @Param('asso', ParseIntPipe) asso: number): Promise<Role>{
        return await this.service.getByUserAndAsso(user, asso)
    }
}
