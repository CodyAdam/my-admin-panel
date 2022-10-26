import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
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
    async getAll(): Promise<Role[]>{
        return await this.service.getAll()
    }
    async getById(@Param('id', ParseIntPipe) id: number): Promise<Role>{
        return await this.service.getById(id)
    }
}
