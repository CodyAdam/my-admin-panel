import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociationsModule } from 'src/associations/associations.module';
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
    forwardRef(() => AssociationsModule)
  ],
  exports: [MinutesService]
})
export class MinutesModule {}
