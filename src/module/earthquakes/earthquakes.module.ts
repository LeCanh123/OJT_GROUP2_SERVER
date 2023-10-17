import { Module } from '@nestjs/common';
import { EarthquakesService } from './earthquakes.service';
import { EarthquakesController } from './earthquakes.controller';
import { earthquakeProviders } from './earthquake.providers';
import { DatabaseModule } from '../typeorms/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EarthquakesController],
  providers: [EarthquakesService,...earthquakeProviders,],
})
export class EarthquakesModule {}
