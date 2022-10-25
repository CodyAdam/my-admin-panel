import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService){}

    public async validateUser(username: number, password: string): Promise<User> {
        try{
            let user = await this.userService.findUser(username)
            if(password == user.password)
                return user
            return undefined
        }catch(e){
            return undefined
        }
    }
}
