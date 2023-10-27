import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DatabaseModule } from '../typeorms/database.module';
import { adminProviders } from './admin.provider';
import { databaseProviders } from '../typeorms/database.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminController],
  providers: [AdminService,...adminProviders,...databaseProviders],
})
export class AdminModule {}
