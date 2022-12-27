import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(username: number, password: string): Promise<User> {
    try {
      // password =  await bcrypt.hash(password, jwtConstants.salt)
      const user = await this.userService.findUser(username);
      if (await bcrypt.compare(password, user.password)) return user;
      return undefined;
    } catch (e) {
      return undefined;
    }
  }

  public async login(user: any) {
    const payload = { username: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
