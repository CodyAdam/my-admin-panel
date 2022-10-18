import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { isErrored } from 'stream';
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
function findUser(id: number): User {
    let res: User = users.find(u => u.id === id)
    if(!res)
        throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND)
    return res
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
        return findUser(id)
    }

    @Put(":id")
    updateUser(@Param('id', ParseIntPipe) id: number, @Body('firstname') firstname: string, @Body('lastname') lastname: string): User {
        let user = findUser(id)
        if(firstname)
            user.firstname = firstname
        if(lastname)
            user.lastname = lastname
        return user
    }

    @Delete(":id")
    deleteUser(@Param('id', ParseIntPipe) id: number): boolean {
        let index = -1
        for(let j=0; j<users.length; j++){
            if(users[j].id === id)
                index = j
        }
        if(index === -1)
            throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND)

        users.splice(index, 1)
        return true
    }
}
