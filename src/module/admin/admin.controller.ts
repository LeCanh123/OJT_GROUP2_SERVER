import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Req, Res, HttpStatus, } from '@nestjs/common';
import { AdminService } from './admin.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async login(@Body() loginDto) {
    try {
      const { userName, password } = loginDto;
      const admin = await this.adminService.findByUserNameAndPassword(String(userName), String(password));
  
      if (!admin) {
        return {
          status: false,
          message: 'Tên người dùng hoặc mật khẩu không chính xác',
          loginDto: null
        };
      } else {
        return {
          status: true,
          message: 'Đăng nhập thành công',
          loginDto
        };
      }
    } catch (error) {
      console.log("err", error);
      // Xử lý lỗi nếu cần thiết
    }
  }

}




