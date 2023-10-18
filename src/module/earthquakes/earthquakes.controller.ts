import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, HttpStatus, HttpException } from '@nestjs/common';
import { EarthquakesService } from './earthquakes.service';
import { CreateEarthquakeDto } from './dto/create-earthquake.dto';
import { UpdateEarthquakeDto } from './dto/update-earthquake.dto';
import { Response } from 'express';

@Controller('earthquakes')
export class EarthquakesController {
  constructor(private readonly earthquakesService: EarthquakesService) {}

   //tạo
   @Post()
  async create(@Body() data,@Res() res:Response) {
    try {
     return res.status(HttpStatus.OK).json( await this.earthquakesService.create(data)) ;
    } catch (error) {
      throw new HttpException("Controller err ",HttpStatus.BAD_REQUEST)
    }
   }
   //Lấy và tìm kiếm 
   @Get()
   async getAll(@Res() res:Response,@Query('q') q:string) {
    try {
      if (q!=undefined) {
        return res.status(HttpStatus.OK)
        .json(await this.earthquakesService.searchByName(q))
      }
      return res.status(HttpStatus.OK)
      .json(await this.earthquakesService.getAll())
    } catch (error) {
      throw new HttpException("Controller err ",HttpStatus.BAD_REQUEST)
    }
   }
   //Lấy theo id
   @Get(":id")
   async findOne(@Param('id') id:string, @Res() res :Response){
    try {
      let result=await this.earthquakesService.findOne(id)
      return res.status(HttpStatus.OK).json(result)
    } catch (error) {
      throw new HttpException ("Controller err",HttpStatus.BAD_REQUEST)
    }
   }
 
   @Get("/test")
   async test() {
     let getallResult=await this.earthquakesService.getNotificate("");
     return getallResult
   }
    //sửa
    @Patch(":id")
    async update(@Param('id') id:string , @Body() updateEarthquake:UpdateEarthquakeDto,@Res() res:Response) {
      try {
        res.status(HttpStatus.OK).json(await this.earthquakesService.update(id,updateEarthquake))
      } catch (error) {
        throw new HttpException("Controller error", HttpStatus.BAD_REQUEST)
      }
    }
     //xoá
     @Post("delete/:id")
     delete(@Body() data) {
       return this.earthquakesService.remove(data);
     }
     
 
 }
 