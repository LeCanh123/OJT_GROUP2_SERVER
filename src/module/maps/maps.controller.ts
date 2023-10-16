import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MapsService } from './maps.service';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';

@Controller('maps')
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}


  //tạo
  @Post("/admin/create")
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
    return this.mapsService.create(data);
  }

  //sửa
  @Post("update/:id")
  update(@Body() data) {
    return this.mapsService.update(data);
  }

  //xoá
  @Post("delete/:id")
  delete(@Body() data) {
    return this.mapsService.remove(data);
  }

  //getall
  @Get()
  async getAll() {
    console.log("vaof get aall");
    let getallResult=await this.mapsService.getAll();
    return getallResult
  }


  @Get("/test")
  async test() {
    let getallResult=await this.mapsService.getNotificate("");
    return getallResult
  }

}
