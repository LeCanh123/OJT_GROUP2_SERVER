import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EarthquakesService } from './earthquakes.service';
import { CreateEarthquakeDto } from './dto/create-earthquake.dto';
import { UpdateEarthquakeDto } from './dto/update-earthquake.dto';

@Controller('earthquakes')
export class EarthquakesController {
  constructor(private readonly earthquakesService: EarthquakesService) {}

   //tạo
   @Post()
   create(@Body() data) {
     console.log("data");
     
     // {
     //   "locationx":"",	
     //   "locationy":"",	
     //   "type":""	,
     //   "name":"",
     //   "block":"null",
     //  "size":123
     // }
     return this.earthquakesService.create(data);
   }
 
   //sửa
   @Post("update/:id")
   update(@Body() data) {
     return this.earthquakesService.update(data);
   }
 
   //xoá
   @Post("delete/:id")
   delete(@Body() data) {
     return this.earthquakesService.remove(data);
   }
 
   //getall
   @Get()
   async getAll() {
     console.log("vaof get aall");
     let getallResult=await this.earthquakesService.getAll();
     return getallResult
   }
 
 
   @Get("/test")
   async test() {
     let getallResult=await this.earthquakesService.getNotificate("");
     return getallResult
   }
 
 }
 