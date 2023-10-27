import { Module } from '@nestjs/common';
import { EarthquakesService } from './earthquakes.service';
import { EarthquakesController } from './earthquakes.controller';
import { earthquakeProviders } from './earthquake.providers';
import { DatabaseModule } from '../typeorms/database.module';
import { CategorysService } from '../categorys/categorys.service';
import { categorysProviders } from '../categorys/categorys.providers';
import { userReponsitoryProviders } from '../userreponsitory/userreponsitory.providers';
import { EmailService } from 'src/utils/mail/mail.service';
import { UsersService1 } from '../user1/user1.service';
import { userReponsitoryProviders1 } from '../user1/user1reponsitory.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EarthquakesController],
  providers: [
    EarthquakesService,
    ...earthquakeProviders,
    CategorysService,
    ...categorysProviders,
  
    EmailService,
    UsersService1,
    ...userReponsitoryProviders1,
  ],
})
export class EarthquakesModule {}
