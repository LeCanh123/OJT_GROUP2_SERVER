import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { Response } from 'express';

@Controller('users1')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  //Lấy ,tìm kiếm ,phân trang
  @Get()
  async findAll(
    @Res() res: Response,
    @Query('q') q: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    try {
      let result;
      if (q != undefined) {
        result = await this.usersService.searchByName(q);
      } else {
        result = await this.usersService.fillAll(page, limit);
      }
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException('Controller err ', HttpStatus.BAD_REQUEST);
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
