import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../typeorms/database.module';
import { usersProviders } from './users.providers';
import { earthquakeProviders } from '../earthquakes/earthquake.providers'; 
import { EarthquakesService } from '../earthquakes/earthquakes.service'; 
import { EarthquakesController } from '../earthquakes/earthquakes.controller'; 

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController,EarthquakesController],
  providers: [UsersService,...usersProviders,
    EarthquakesService,...earthquakeProviders,
  
  ],
})
export class UsersModule {}
