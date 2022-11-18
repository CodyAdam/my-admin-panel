import { Body, Controller, Delete, forwardRef, Get, Inject, Param, ParseArrayPipe, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Minute } from 'src/minutes/minute.entity';
import { MinutesService } from 'src/minutes/minutes.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AssociationDTO } from './association.dto';
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
        private users: UsersService,
        private minutes: MinutesService
        ){}

    @Get()
    async getAll(): Promise<AssociationDTO[]> {
        let assos = await this.service.getAll()
        let assosDTO = Promise.all(assos.map(a => this.service.mapDTO(a)))
        return assosDTO
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<AssociationDTO> {
        let asso = await this.service.findById(id)
        return this.service.mapDTO(asso)
    }

    @Post()
    async create(@Body() a: AssociationCreate): Promise<AssociationDTO> {
        let users: User[] = await Promise.all(a.idUsers.map(async u => await this.users.findUser(u)))
        let asso = await this.service.create(users, a.name)
        return this.service.mapDTO(asso)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() a: AssociationUpdate): Promise<AssociationDTO> {
        let users: User[]
        if(a.idUsers)
            users = await Promise.all(a.idUsers.map(async u => await this.users.findUser(u)))
        let asso = await this.service.update(id, users, a.name)
        return this.service.mapDTO(asso)
    }

    @Get(':id/minutes')
    async getMinutes(@Param('id', ParseIntPipe) id: number, @Body() body): Promise<Minute[]> {
        return this.minutes.getByAsso(id, body.sort, body.order)
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
