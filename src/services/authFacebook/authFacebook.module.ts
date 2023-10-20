import { Module } from '@nestjs/common';
import { AuthFacebookController } from './authFacebook.controller';
import { AuthFacebookService } from './authFacebook.service';
import { FacebookStrategy } from './utils/FacebookStrategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/module/users/entities/user.entity';
import { SessionSerializer } from './utils/Serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthFacebookController],
  providers: [
    FacebookStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_FACEBOOK_SERVICE',
      useClass: AuthFacebookService,
    },
  ],
})
export class AuthFacebookModule {}
