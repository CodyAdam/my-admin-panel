import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UsersService } from './users.service';

export class UserInput {
    @ApiProperty({
        description: 'Firstname',
        example: 'John',
        type: String
    })
    public firstname: string
    @ApiProperty({
        description: 'Lastname',
        example: 'Doe',
        type: String
    })
    public lastname: string
    @ApiProperty({
        description: 'Age',
        example: 22,
        type: Number
    })
    public age: number
}

@Controller('users')
@ApiTags('users')
export class UsersController {

    constructor(private service: UsersService){}

    @Get()
    async getAll(): Promise<User[]> {
        return await this.service.getAll()
    }

    @ApiCreatedResponse({
        description: 'The user has neem successfully created.'
    })
    @Post()
    async create(@Body() u: UserInput): Promise<User> {
        return await this.service.create(u.lastname, u.firstname, u.age)
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
