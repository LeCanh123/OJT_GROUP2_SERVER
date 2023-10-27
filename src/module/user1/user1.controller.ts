import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService1 } from './user1.service'; 


@Controller('users1')
export class UsersController1 {
  constructor(private readonly usersService: UsersService1) {}

  @Post("/facebooklogin")
  facebooklogin(@Body() data) {
    return this.usersService.facebooklogin(data);
  }

  @Post("/googlelogin")
  googlelogin(@Body() data) {
    return this.usersService.googlelogin(data)
  }


}