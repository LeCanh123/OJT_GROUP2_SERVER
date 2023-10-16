import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Express } from 'express'
import { Multer } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { uploadFileToStorage } from 'src/services/meobase'; 
@Controller('categorys')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) {}

  @Post('admin/add')
  async create(@Body() data ,@UploadedFiles() image: Array<Express.Multer.File>) {
    const originalFileName = image?.[0]?.originalname;
    console.log("originalFileName",image);
    
    const fileExtension = path.extname(originalFileName); // Trích xuất đuôi tệp tin
    const uploadedFilePath = image?.[0]?.path;
    const newFilePath = uploadedFilePath + fileExtension; // Đường dẫn mới với đuôi tệp tin đúng
    fs.renameSync(uploadedFilePath, newFilePath); // Đổi tên tệp tin
    //upload
    let avatarProcess;
    if(image?.[0]){
      avatarProcess = await uploadFileToStorage(image[0], "image", fs.readFileSync(newFilePath));
     }
    //xoá sau khi upload
    fs.unlinkSync(newFilePath);

    let createCategoryResult=await this.categorysService.create({...data,image:avatarProcess});
    return createCategoryResult;


    // return this.categorysService.create(data);
  }

  @Post('admin/get')
  get(@Body() data) {
    return this.categorysService.getall(data);
  }

  @Post('admin/delete')
  delete(@Body() data) {
    return this.categorysService.delete(data);
  }

  // @Get()
  // findAll() {
  //   return this.categorysService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categorysService.findOne(+id); 
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categorysService.update(+id, updateCategoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categorysService.remove(+id);
  // }
}


