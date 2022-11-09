import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Minute } from './minute.entity';
import { MinuteInput } from './minutes.input';
import { MinutesService } from './minutes.service';
import { MinuteUpdate } from './minutes.update';

// @UseGuards(AuthGuard('jwt'))
@Controller('minutes')
export class MinutesController {
    constructor(private service: MinutesService){}

    @Get()
    async getAll(): Promise<Minute[]> {
        return await this.service.getAll()
    }
    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<Minute> {
        return this.service.getById(id)
    }
    @Post()
    async create(@Body() min: MinuteInput): Promise<Minute>{
        return this.service.create(min)
    }
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() min: MinuteUpdate): Promise<Minute>{
        return this.service.update(id, min)
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        return this.service.delete(id)
    }
}
