import { forwardRef, Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './association.entity';
import { RoleModule } from 'src/role/role.module';

@Module({
  providers: [AssociationsService],
  controllers: [AssociationsController],
  imports: [
    UsersModule, TypeOrmModule.forFeature([Association]), 
    RoleModule
  ],
  exports: [AssociationsService]
})
export class AssociationsModule {}
