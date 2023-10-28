import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Req, Res, HttpStatus, } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async login(@Body() loginDto,@Res() res: Response) {
    try {
      const { userName, password } = loginDto;
      const result = await this.adminService.findByUserNameAndPassword(String(userName), String(password));
      if (result.status) {
        return res.status(200).json(result);
      }
      return res.status(201).json(result);
    } catch (error) {
      return res.status(201).json({
        status: false,
        message: 'Đăng nhập admin thất bại',
        err:error
      });
    }
  }



  @Post("/checktoken")
  async checktoken(@Body() data,@Res() res: Response) {
    try {
      const { token } = data;
      const result = await this.adminService.adminChecktoken(token);
      if (result.status) {
        return res.status(200).json(result);
      }
      return res.status(201).json(result);
    } catch (error) {
      return res.status(201).json({
        status: false,
        message: 'Lỗi hệ thống',
        err:error
      });
    }
  }



  @Post("/register")
  async register() {
   return  await this.adminService.adminRegister()
  }

}


