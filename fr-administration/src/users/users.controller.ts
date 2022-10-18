import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';

const users: User[] = [
    {
        id: 0,
        lastname: 'Doe',
        firstname: 'John'
    }
]

@Controller('users')
export class UsersController {
    @Get('all')
    getAll(): User[] {
        return users
    }
}
