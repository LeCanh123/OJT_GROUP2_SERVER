import { Module } from '@nestjs/common';
import { EarthquakesService } from './earthquakes.service';
import { EarthquakesController } from './earthquakes.controller';
import { earthquakeProviders } from './earthquake.providers';
import { DatabaseModule } from '../typeorms/database.module';
import { CategorysService } from '../categorys/categorys.service';
import { categorysProviders } from '../categorys/categorys.providers';
import { userReponsitoryProviders } from '../userreponsitory/userreponsitory.providers';
import { EmailService } from 'src/utils/mail/mail.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EarthquakesController],
  providers: [
    EarthquakesService,
    ...earthquakeProviders,
    CategorysService,
    ...categorysProviders,
    ...userReponsitoryProviders,
    EmailService,
  ],
})
export class EarthquakesModule {}
