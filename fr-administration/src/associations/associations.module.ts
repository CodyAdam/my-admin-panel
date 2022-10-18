import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';

@Module({
  providers: [AssociationsService],
  controllers: [AssociationsController]
})
export class AssociationsModule {}
