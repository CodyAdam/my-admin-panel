import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService){}

    @Get()
    getAll(): User[] {
        return this.service.getAll()
    }

    @Post()
    create(@Body('lastname') lastname: string, @Body('firstname') firstname: string, @Body('age', ParseIntPipe) age: number): User {
        return this.service.create(lastname, firstname, age)
    }
    
    @Get(":id")
    getUser(@Param('id', ParseIntPipe) id: number): User {
        return this.service.findUser(id)
    }

    @Put(":id")
    updateUser(@Param('id', ParseIntPipe) id: number, 
        @Body('firstname') firstname: string, 
        @Body('lastname') lastname: string,
        @Body('age', ParseIntPipe) age: number): User {
        return this.service.updateUser(id, firstname, lastname, age)
    }

    @Delete(":id")
    deleteUser(@Param('id', ParseIntPipe) id: number): boolean {
        return this.deleteUser(id)
    }
}
