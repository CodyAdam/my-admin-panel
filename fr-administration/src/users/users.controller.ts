import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {

    constructor(private service: UsersService){}

    @Get()
    async getAll(): Promise<User[]> {
        return await this.service.getAll()
    }

    @Post()
    async create(@Body('lastname') lastname: string, @Body('firstname') firstname: string, @Body('age', ParseIntPipe) age: number): Promise<User> {
        return await this.service.create(lastname, firstname, age)
    }
    
    @Get(":id")
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return await this.service.findUser(id)
    }

    @Put(":id")
    async updateUser(@Param('id', ParseIntPipe) id: number, 
        @Body('firstname') firstname: string, 
        @Body('lastname') lastname: string,
        @Body('age', ParseIntPipe) age: number): Promise<User> {
        return await this.service.updateUser(id, firstname, lastname, age)
    }

    @Delete(":id")
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        return await this.service.deleteUser(id)
    }
}
