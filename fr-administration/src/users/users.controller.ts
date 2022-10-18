import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import supertest from 'supertest';
import { User } from './user.entity';

const users: User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John'
    }
]

function getNewId(): number {
    let max = 0;
    users.forEach(u => {
        if(u.id > max)
            max = u.id
    });
    return max+1
}

@Controller('users')
export class UsersController {
    @Get()
    getAll(): User[] {
        return users
    }

    @Post()
    create(@Body() input: any): User {
        let user = new User(getNewId(), input.lastname, input.firstname)
        users.push(user)
        return user
    }
    
    @Get(":id")
    getUser(@Param('id', ParseIntPipe) id: number): User {
        return users.find(u => u.id === id)
    }
}
