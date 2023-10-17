import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { AuthFacebookService } from '../authFacebook.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    @Inject('AUTH_FACEBOOK_SERVICE')
    private readonly authFacebookService: AuthFacebookService,
  ) {
    super({
      clientID: '686736140068860',
      clientSecret: '1237a3ce3481c2819fca370932331c7a',
      callbackURL: 'http://localhost:3000/api/v1/facebook/redirect',
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}
