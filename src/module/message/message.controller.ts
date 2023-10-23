import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UploadedFile, Query, HttpStatus, HttpException, UploadedFiles } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { uploadFileToStorage } from 'src/services/meobase';
import { log } from 'console';



@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post()
 async create(@Body()data, createMessageDto: CreateMessageDto ,@Res() res:Response ,
 @UploadedFiles() files:Array<Express.Multer.File>
  ) {
    try {
      let file=files?.[0]?.originalname;
      let fileExtension=path.extname(file)
      let uploadedFilePath=files?.[0]?.path
      let newFilePath=uploadedFilePath+fileExtension;
      fs.renameSync(uploadedFilePath,newFilePath)
        let avatarProcess=await uploadFileToStorage(files[0],"image",fs.readFileSync(newFilePath))
      fs.unlinkSync(newFilePath)   
      let createMessage=await this.messageService.create({
        ...data,
        file:avatarProcess
      })
      return res.status(HttpStatus.OK).json(createMessage)
    } catch (error) {
      console.log("err",error)
      throw new HttpException("Controller Error",HttpStatus.BAD_REQUEST)
    }
  }
  //Lấy ,tìm kiếm ,phân trang
  @Get()
  async findAll(@Res() res:Response,@Query('q') q:string ,@Query("page") page:number,@Query("limit") limit:number) {
    try {
      let result;
      if (q!==undefined) {
        result= await this.messageService.searchByMessage(q);
      }else{
        result =await this.messageService.findAll(page,limit)
      }
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      console.log("err",error)
      throw new HttpException("Controller Error",HttpStatus.BAD_REQUEST)
    }
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
 async remove(@Param('id') id: number ,@Res() res:Response) {
    try {
      return res.status(HttpStatus.OK).json(await this.messageService.remove(id))
    } catch (error) {
      throw new HttpException("Controller err ",HttpStatus.BAD_REQUEST )
    }
  }
}
