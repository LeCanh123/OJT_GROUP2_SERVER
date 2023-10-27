import { Module } from '@nestjs/common';
import { UsersService1 } from './user1.service'; 
import { UsersController1 } from './user1.controller';
import { DatabaseModule } from '../typeorms/database.module';
import { userReponsitoryProviders1 } from './user1reponsitory.providers'; 
// import { earthquakeProviders } from '../earthquakes/earthquake.providers';
// import { EarthquakesService } from '../earthquakes/earthquakes.service';
// import { EarthquakesController } from '../earthquakes/earthquakes.controller';


@Module({
  imports: [DatabaseModule],
  controllers: [UsersController1],
  providers: [
    UsersService1,
    ...userReponsitoryProviders1,

  ],
})
export class UsersModule1 {}
