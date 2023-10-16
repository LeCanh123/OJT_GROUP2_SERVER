import { Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';
import { mapsProviders } from './maps.providers';
import { DatabaseModule } from '../typeorms/database.module';
import { databaseProviders } from '../typeorms/database.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [MapsController],
  providers: [MapsService,...mapsProviders,...databaseProviders],
})
export class MapsModule {}
