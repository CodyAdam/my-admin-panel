import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsModule } from './associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './associations/association.entity';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydatabase.db',
      entities: [
        User,
        Association,
        Role
      ],
      synchronize: true
    }),
    UsersModule, AssociationsModule, AuthModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
