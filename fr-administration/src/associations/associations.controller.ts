import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Put } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Association } from './association.entity';
import { AssociationsService } from './associations.service';

@Controller('associations')
export class AssociationsController {
    constructor(
        private service: AssociationsService,
        private users: UsersService
        ){}

    @Get()
    async getAll(): Promise<Association[]> {
        return await this.service.getAll()
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<Association> {
        return await this.service.findById(id)
    }

    @Post()
    async create(@Body('idUsers') idUsers: number[], @Body('name') name: string): Promise<Association> {
        let users: User[] = await Promise.all(idUsers.map(async u => await this.users.findUser(u)))
        return await this.service.create(users, name)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body('idUsers') idUsers: number[], @Body('name') name: string): Promise<Association> {
        let users: User[] = await Promise.all(idUsers.map(async u => await this.users.findUser(u)))
        return await this.service.update(id, users, name)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        return await this.service.delete(id)
    }

    @Get(':id/members')
    async getMembers(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
        let asso = await this.service.findById(id)
        return asso.idUsers
    }
}
