import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AssociationsService],
  controllers: [AssociationsController],
  imports: [UsersModule]
})
export class AssociationsModule {}
