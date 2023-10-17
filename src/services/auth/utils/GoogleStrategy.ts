import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from 'src/services/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID:
        '806069934555-tpgcgutkv3bi16dd23r6ob0vqk3lma2v.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/api/v1/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refeshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refeshToken);
    console.log(profile);
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      displayName: profile.displayName,
    });
    console.log('Validate');
    console.log(user);
    return user || null;
  }
}
