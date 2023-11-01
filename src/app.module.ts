import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './module/users/users.module';
import { CategorysModule } from './module/categorys/categorys.module';
import { EarthquakesModule } from './module/earthquakes/earthquakes.module';

import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './module/message/message.module';
import { UsersModule } from './module/user/user.module';
import { AdminModule } from './module/admin/admin.module';


//orm
import { Admin } from './module/admin/entities/admin.entity';
import { Category } from './module/categorys/entities/category.entity';
import { Earthquake } from './module/earthquakes/entities/earthquake.entity';
import { Message } from './module/message/entities/message.entity';
import { User } from './module/user/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    CategorysModule,
    EarthquakesModule,
    MessageModule,
    AdminModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nhom2',
      entities: [Admin,Category,Earthquake,Message,User],
      synchronize: true,
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
