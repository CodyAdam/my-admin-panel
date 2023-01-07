import {Controller, Post, UseGuards, Request, Body} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {ApiCreatedResponse} from "@nestjs/swagger";
import {User} from "../users/user.entity";
import {UserCreation} from "../users/users.controller";
import {UsersService} from "../users/users.service";

@Controller('auth')
export class AuthController {
  constructor(
      private authService: AuthService,
      private userService: UsersService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @ApiCreatedResponse({
    description: 'The user has beem successfully created.',
  })
  @Post('register')
  async create(@Body() u: UserCreation): Promise<User> {
    return await this.userService.create(
        u.firstname,
        u.lastname,
        u.age,
        u.password,
        u.email
    );
  }
}
