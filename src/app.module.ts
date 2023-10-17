import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { CategorysModule } from './module/categorys/categorys.module';
import { EarthquakesModule } from './module/earthquakes/earthquakes.module';



@Module({
  imports: [UsersModule,CategorysModule,
    EarthquakesModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
