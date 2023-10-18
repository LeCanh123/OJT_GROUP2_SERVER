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
  //Thêm
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

  //Lấy ,tìm kiếm ,phân trang 
  @Get()
  async findAll(
    @Res() res: Response,
    @Query('q') q: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    try {
      const skip = (page - 1) * limit;
      let result;
      if (q !== undefined) {
        result = await this.categorysService.searchByTitle(q);
      } else {
        result = await this.categorysService.findAllPage(page, limit);
      }
      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      throw new HttpException('Lỗi controller', HttpStatus.BAD_REQUEST);
    }
  }
  @Get()
  async GetAll(){
    try {
      let category= await this.categorysService.findAll()
      return {
       category
      }
    } catch (error) {
      console.log("err",error);
      
      
    }
  }
//Lấy theo id
  @Get(':id')
 async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      let result= await this.categorysService.findOne(id)
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.log('err', error);
      throw new HttpException('Controller error', HttpStatus.BAD_REQUEST);
    }
  }
  //Sửa
  @Patch(':id')
 async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res: Response,
  ) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(await this.categorysService.update(id, updateCategoryDto));
    } catch (error) {
      throw new HttpException('Controller err ', HttpStatus.BAD_REQUEST);
    }
  }
//Xóa
  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json(this.categorysService.remove(id));
    } catch (error) {
      throw new HttpException('Controller error', HttpStatus.BAD_REQUEST);
    }
  }
}

