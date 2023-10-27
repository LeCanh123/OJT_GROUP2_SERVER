import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './module/users/users.module';
import { CategorysModule } from './module/categorys/categorys.module';
import { EarthquakesModule } from './module/earthquakes/earthquakes.module';

import { AuthModule } from './services/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { User } from './module/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './module/message/message.module';
import { UsersModule1 } from './module/user1/user1.module';
import { AdminModule } from './module/admin/admin.module';


@Module({
  imports: [
    UsersModule1,
    UsersModule,
    CategorysModule,
    EarthquakesModule,
    AuthModule,
    MessageModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nhom2',
      entities: [User],
      synchronize: true,
    }),
    AdminModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
