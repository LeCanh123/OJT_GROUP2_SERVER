import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapsModule } from './module/maps/maps.module';
import { UsersModule } from './module/users/users.module';
import { CategorysModule } from './module/categorys/categorys.module';



@Module({
  imports: [MapsModule,UsersModule,CategorysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
