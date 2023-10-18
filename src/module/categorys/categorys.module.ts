import { Module } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { DatabaseModule } from '../typeorms/database.module';
import { categorysProviders } from './categorys.providers';
import { databaseProviders } from '../typeorms/database.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategorysController],
  providers: [CategorysService, ...categorysProviders, ...databaseProviders],
})
export class CategorysModule {}
