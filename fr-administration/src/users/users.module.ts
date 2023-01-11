import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: 'MAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBIT_USER}:${process.env.RABBIT_PWD}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`,
          ],
          queue: process.env.RABBIT_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
})
export class UsersModule {}
