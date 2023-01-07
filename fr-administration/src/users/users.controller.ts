import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UsersService } from './users.service';

export class UserCreation {
  @ApiProperty({
    description: 'Firstname',
    example: 'John',
    type: String,
  })
  public firstname: string;
  @ApiProperty({
    description: 'Lastname',
    example: 'Doe',
    type: String,
  })
  public lastname: string;
  @ApiProperty({
    description: 'Age',
    example: 22,
    type: Number,
  })
  public age: number;
  @ApiProperty({
    description: 'Password',
    example: 'test',
    type: String,
  })
  public password: string;
  @ApiProperty({
    description: 'Email',
    example: 'test@example.fr',
    type: String,
  })
  public email: string;
}
export class UserUpdate {
  @ApiProperty({
    description: 'Firstname',
    example: 'John',
    type: String,
    required: false,
  })
  public firstname?: string;
  @ApiProperty({
    description: 'Lastname',
    example: 'Doe',
    type: String,
    required: false,
  })
  public lastname?: string;
  @ApiProperty({
    description: 'Age',
    example: 22,
    type: Number,
    required: false,
  })
  public age?: number;
  @ApiProperty({
    description: 'Password',
    example: 'test',
    type: String,
  })
  public password?: string;
  @ApiProperty({
    description: 'Email',
    example: 'test@example.fr',
    type: String,
  })
  public email?: string;
}

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(): Promise<User[]> {
    return await this.service.getAll();
  }

  @ApiCreatedResponse({
    description: 'The user has neem successfully created.',
  })
  @Post()
  async create(@Body() u: UserCreation): Promise<User> {
    return await this.service.create(
      u.lastname,
      u.firstname,
      u.age,
      u.password,
      u.email,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.service.findUser(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() u: UserUpdate,
  ): Promise<User> {
    return await this.service.updateUser(
      id,
      u.firstname,
      u.lastname,
      u.age,
      u.password,
      u.email,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return await this.service.deleteUser(id);
  }
}
