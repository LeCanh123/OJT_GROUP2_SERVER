import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { DatabaseModule } from '../typeorms/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { messageProviders } from './message.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [MessageController],
  providers: [MessageService,...messageProviders],
})
export class MessageModule {}
