import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { UsersService1 } from './user1.service';
import { Response } from 'express';

@Controller('users1')
export class UsersController1 {
  constructor(private readonly usersService: UsersService1) {}

  @Post('/facebooklogin')
  facebooklogin(@Body() data) {
    return this.usersService.facebooklogin(data);
  }

  @Post('/googlelogin')
  googlelogin(@Body() data) {
    return this.usersService.googlelogin(data);
  }

  @Post('/checktoken')
  async checktoken(@Body() data, @Res() res: Response) {
    try {
      const { token } = data;
      const result = await this.usersService.userChecktoken(token);
      if (result.status) {
        return res.status(200).json(result);
      }
      return res.status(201).json(result);
    } catch (error) {
      return res.status(201).json({
        status: false,
        message: 'Lỗi hệ thống',
        err: error,
      });
    }
  }

  @Get('/getusers')
  async getAllUser(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.usersService.getAllUser();
      if (result.status) {
        return res.status(200).json(result);
      }
      return res.status(201).json(result);
    } catch (error) {
      return res.status(201).json({
        status: false,
        message: 'Lỗi hệ thống',
        err: error,
      });
    }
  }
}
