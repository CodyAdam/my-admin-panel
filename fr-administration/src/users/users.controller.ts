import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    getAll(): string[] {
        return ['a', 'b', 'c']
    }
}
