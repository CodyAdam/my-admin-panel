import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';

const users: User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John',
        age: 23
    }
]

@Injectable()
export class UsersService {
    getNewId(): number {
        let max = 0;
        users.forEach(u => {
            if(u.id > max)
                max = u.id
        });
        return max+1
    }
    findUser(id: number): User {
        let res: User = users.find(u => u.id === id)
        if(!res)
            throw new HttpException(`User ${id} not found`, HttpStatus.NOT_FOUND)
        return res
    }
    getAll(): User[] {
        return users
    }
    create(firstname: string, lastname: string, age: number): User {
        let user = new User(this.getNewId(), lastname, firstname, age)
        users.push(user)
        return user
    }
    getUser(id: number): User {
        return this.findUser(id)
    }
    updateUser(id: number, firstname: string, lastname: string, age: number): User {
        let user = this.findUser(id)
        if(firstname)
            user.firstname = firstname
        if(lastname)
            user.lastname = lastname
        if(age)
            user.age = age
        return user
    }
    deleteUser(id: number): boolean {
        let index = -1
        for(let j=0; j<users.length; j++){
            if(users[j].id === id)
                index = j
        }
        if(index === -1)
            return false

        users.splice(index, 1)
        return true
    }
}
