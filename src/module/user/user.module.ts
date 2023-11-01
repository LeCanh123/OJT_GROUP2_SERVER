import { Module } from '@nestjs/common';
import { UsersService } from './user.service'; 
import { UsersController } from './user.controller';
import { DatabaseModule } from '../typeorms/database.module';
import { userReponsitoryProviders } from './userreponsitory.providers'; 
// import { earthquakeProviders } from '../earthquakes/earthquake.providers';
// import { EarthquakesService } from '../earthquakes/earthquakes.service';
// import { EarthquakesController } from '../earthquakes/earthquakes.controller';


@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...userReponsitoryProviders,

  ],
})
export class UsersModule {} 
