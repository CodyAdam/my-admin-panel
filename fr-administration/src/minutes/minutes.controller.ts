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
import { ApiTags } from '@nestjs/swagger';
import { Minute } from './minute.entity';
import { MinuteInput } from './minutes.input';
import { MinutesService } from './minutes.service';
import { MinuteUpdate } from './minutes.update';
import { MinuteDTO } from './minuteDTO.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('minutes')
@ApiTags('minutes')
export class MinutesController {
  constructor(private service: MinutesService) {}

  @Get()
  async getAll(): Promise<MinuteDTO[]> {
    return (await this.service.getAll()).map((m) => this.service.mapToDTO(m));
  }
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<MinuteDTO> {
    return this.service.mapToDTO(await this.service.getById(id));
  }
  @Post()
  async create(@Body() min: MinuteInput): Promise<MinuteDTO> {
    return this.service.mapToDTO(await this.service.create(min));
  }
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() min: MinuteUpdate,
  ): Promise<MinuteDTO> {
    return this.service.mapToDTO(await this.service.update(id, min));
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.service.delete(id);
  }
}
