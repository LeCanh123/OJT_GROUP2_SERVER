import { Body, Controller, Inject, Post } from '@nestjs/common';
import jwt from '../jwt';
import { AuthService } from './auth.service';

export class CreateTokenDto {
  email: string;
  displayName: string;
  token: string;
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
      const { email } = createTokenDto;
      console.log('createTokenDto', createTokenDto);
      const token = jwt.createTokenforever(email) || '';
      const loggedUser = await this.authService.validateUser({
        ...createTokenDto,
        token,
      });
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
