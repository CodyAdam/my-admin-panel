import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards,} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiProperty, ApiTags} from '@nestjs/swagger';
import {Minute} from 'src/minutes/minute.entity';
import {MinutesService} from 'src/minutes/minutes.service';
import {UsersService} from '../users/users.service';
import {AssociationDTO} from './association.dto';
import {AssociationsService} from './associations.service';
import {Member} from "./association.member";

export class AssociationCreate {
  @ApiProperty({
    description: 'Name',
    example: 'ADAPEI',
    type: String,
  })
  public name: string;
}
export class AssociationUpdate {
  @ApiProperty({
    description: 'Name',
    example: 'ADAPEI',
    type: String,
    required: false,
  })
  public name?: string;
}

@Controller('associations')
@ApiTags('associations')
@UseGuards(AuthGuard('jwt'))
export class AssociationsController {
  constructor(
    private service: AssociationsService,
    private users: UsersService,
    private minutes: MinutesService,
  ) {}

  @Get()
  async getAll(): Promise<AssociationDTO[]> {
    const assos = await this.service.getAll();
    const assosDTO = Promise.all(assos.map((a) => this.service.mapDTO(a)));
    return assosDTO;
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<AssociationDTO> {
    const asso = await this.service.findById(id);
    return this.service.mapDTO(asso);
  }

  @Post()
  async create(@Body() a: AssociationCreate): Promise<AssociationDTO> {
    const asso = await this.service.create(a.name);
    return this.service.mapDTO(asso);
  }

  @Get(':id/members')
  async getMembers(@Param('id', ParseIntPipe) id: number): Promise<Member[]> {
    return (await this.service.mapDTO(await this.service.findById(id))).members;
  }

  @Get('search/:name')
  async search(@Param('name') name: string): Promise<AssociationDTO[]> {
    const assos = await this.service.search(name);
    return Promise.all(assos.map((a) => this.service.mapDTO(a)));
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() a: AssociationUpdate,
  ): Promise<AssociationDTO> {
    const asso = await this.service.update(id, a.name);
    return this.service.mapDTO(asso);
  }

  @Get(':id/minutes')
  async getMinutes(
    @Param('id', ParseIntPipe) id: number,
    @Body() body,
  ): Promise<Minute[]> {
    return this.minutes.getByAsso(id, body.sort, body.order);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return await this.service.delete(id);
  }
}
