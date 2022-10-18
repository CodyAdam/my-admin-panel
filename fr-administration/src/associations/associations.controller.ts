import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Association } from './association.entity';
import { AssociationsService } from './associations.service';

@Controller('associations')
export class AssociationsController {
    constructor(private service: AssociationsService){}

    @Get()
    getAll(): Association[] {
        return this.service.getAll()
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number): Association {
        return this.service.findById(id)
    }

    @Post()
    create(@Body('idUsers') idUsers: number[], @Body('name') name: string): Association {
        return this.service.create(idUsers, name)
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body('idUsers') idUsers: number[], @Body('name') name: string): Association {
        return this.service.update(id, idUsers, name)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): boolean {
        return this.service.delete(id)
    }
}
