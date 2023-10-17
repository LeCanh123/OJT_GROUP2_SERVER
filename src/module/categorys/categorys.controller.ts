import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  Query,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

import { uploadFileToStorage } from 'src/services/meobase';
@Controller('categorys')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) {}
  @Post('')
  async create(
    @Body() data,
    @UploadedFiles() icon: Array<Express.Multer.File>,
  ) {
    const originalFileName = icon?.[0]?.originalname;
    console.log('originalFileName', icon);
    const fileExtension = path.extname(originalFileName); // Trích xuất đuôi tệp tin
    const uploadedFilePath = icon?.[0]?.path;
    const newFilePath = uploadedFilePath + fileExtension; // Đường dẫn mới với đuôi tệp tin đúng
    fs.renameSync(uploadedFilePath, newFilePath); // Đổi tên tệp tin
    //upload
    let avatarProcess;
    if (icon?.[0]) {
      avatarProcess = await uploadFileToStorage(
        icon[0],
        'image',
        fs.readFileSync(newFilePath),
      );
    }
    //xoá sau khi upload
    fs.unlinkSync(newFilePath);
    const createCategoryResult = await this.categorysService.create({
      ...data,
      icon: avatarProcess,
    });
    return createCategoryResult;
  }
  @Get()
  async findAll(@Res() res: Response, @Query('q') q: string) {
    try {
      if (q != undefined) {
        return res
          .status(HttpStatus.OK)
          .json(await this.categorysService.searchByTitle(q));
      }
      return res
        .status(HttpStatus.OK)
        .json(await this.categorysService.findAll());
    } catch (err) {
      throw new HttpException('Lỗi controller', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json(this.categorysService.findOne(id));
    } catch (error) {
      console.log('err', error);
      throw new HttpException('Controller error', HttpStatus.BAD_REQUEST);
    }
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res: Response,
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(this.categorysService.update(id, updateCategoryDto));
    } catch (error) {
      throw new HttpException('Controller err ', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json(this.categorysService.remove(id));
    } catch (error) {
      throw new HttpException('Controller error', HttpStatus.BAD_REQUEST);
    }
  }
}

