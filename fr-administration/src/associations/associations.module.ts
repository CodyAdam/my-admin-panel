import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './association.entity';
import { RoleModule } from 'src/role/role.module';
import { MinutesModule } from 'src/minutes/minutes.module';

@Module({
  providers: [AssociationsService],
  controllers: [AssociationsController],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Association]),
    RoleModule,
    MinutesModule,
  ],
  exports: [AssociationsService],
})
export class AssociationsModule {}
