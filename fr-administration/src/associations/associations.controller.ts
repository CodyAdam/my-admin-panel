import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Association } from './association.entity';
import { AssociationsService } from './associations.service';

export class AssociationCreate{
    @ApiProperty({
        description: 'List of users',
        example: [1],
        type: Array<Number>
    })
    public idUsers: number[]
    @ApiProperty({
        description: 'Name',
        example: 'ADAPEI',
        type: String
    })
    public name: string
}
export class AssociationUpdate{
    @ApiProperty({
        description: 'List of users',
        example: [1],
        type: Array<Number>,
        required: false
    })
    public idUsers?: number[]
    @ApiProperty({
        description: 'Name',
        example: 'ADAPEI',
        type: String,
        required: false
    })
    public name?: string
}


@Controller('associations')
@ApiTags('associations')
@UseGuards(AuthGuard('jwt'))
export class AssociationsController {
    constructor(
        private service: AssociationsService,
        private users: UsersService
        ){}

    @Get()
    async getAll(): Promise<Association[]> {
        return await this.service.getAll()
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<Association> {
        return await this.service.findById(id)
    }

    @Post()
    async create(@Body() a: AssociationCreate): Promise<Association> {
        let users: User[] = await Promise.all(a.idUsers.map(async u => await this.users.findUser(u)))
        return await this.service.create(users, a.name)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() a: AssociationUpdate): Promise<Association> {
        let users: User[]
        if(a.idUsers)
            users = await Promise.all(a.idUsers.map(async u => await this.users.findUser(u)))
        return await this.service.update(id, users, a.name)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        return await this.service.delete(id)
    }

    @Get(':id/members')
    async getMembers(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
        let asso = await this.service.findById(id)
        return asso.idUsers
    }
}
