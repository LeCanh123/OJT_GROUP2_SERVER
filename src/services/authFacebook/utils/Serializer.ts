/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthFacebookService } from '../authFacebook.service';
import { User } from 'src/module/users/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_FACEBOOK_SERVICE')
    private readonly authFacebookService: AuthFacebookService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    console.log('Serialize User');
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.authFacebookService.findUser(payload.id);
    console.log('Deserialize User');
    console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}
