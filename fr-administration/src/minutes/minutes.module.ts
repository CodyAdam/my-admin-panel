import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationsService } from 'src/associations/associations.service';
import { UsersModule } from 'src/users/users.module';
import { Minute } from './minute.entity';
import { MinutesController } from './minutes.controller';
import { MinutesService } from './minutes.service';

@Module({
  controllers: [MinutesController],
  providers: [MinutesService],
  imports: [
    TypeOrmModule.forFeature([Minute]),
    UsersModule,
    AssociationsService
  ]
})
export class MinutesModule {}
