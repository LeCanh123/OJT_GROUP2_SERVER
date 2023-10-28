import { Body, Controller, Inject, Post } from '@nestjs/common';
import jwt from '../jwt';
import { AuthService } from './auth.service';

export class CreateTokenDto {
  email: string;
  oauth_id: string;
  display_name: string;
  type_login: number;
}

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @Post('token')
  async handleGenerateToken(@Body() createTokenDto: CreateTokenDto) {
    try {
      const loggedUser =
        await this.authService.findOrCreateUser(createTokenDto);
      const token =
        jwt.createTokenforever(JSON.parse(JSON.stringify(loggedUser))) || '';

      return {
        status: true,
        message: 'Token generated successfully',
        result: { token, user: loggedUser },
      };
    } catch (err) {
      console.log('err', err);
    }
  }
}
