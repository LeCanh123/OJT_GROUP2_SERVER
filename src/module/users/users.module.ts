import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../typeorms/database.module';
import { usersProviders } from './users.providers';
import { mapsProviders } from '../maps/maps.providers';
import { MapsService } from '../maps/maps.service';
import { MapsController } from '../maps/maps.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController, MapsController],
  providers: [UsersService, ...usersProviders, MapsService, ...mapsProviders],
})
export class UsersModule {}
