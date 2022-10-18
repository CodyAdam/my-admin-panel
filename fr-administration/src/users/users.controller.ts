import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get('all')
    getAll(): string[] {
        return ['a', 'b', 'c', 'd']
    }
}
