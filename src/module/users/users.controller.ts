// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
// } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Post()
//   create(@Body() createUserDto: CreateUserDto) {
//     return this.usersService.create(createUserDto);
//   }

//   //gửi tin nhắn cho toàn bộ user
//   @Post('sendemail')
//   sendEmail(@Body() data) {
//     //xác nhận admin

//     return this.usersService.sendEmail(data);
//   }

//   //thay đổi thời gian xem thông báo
//   @Post('changetime')
//   changeTime(@Body() data) {
//     //giải nén user

//     return this.usersService.changeTimeNotification(data);
//   }
// }
