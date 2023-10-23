import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { EarthquakesService } from './earthquakes.service';
import { CreateEarthquakeDto } from './dto/create-earthquake.dto';
import { UpdateEarthquakeDto } from './dto/update-earthquake.dto';
import { Response } from 'express';

@Controller('earthquakes')
export class EarthquakesController {
  constructor(private readonly earthquakesService: EarthquakesService) {}

  //tạo
  @Post()
  async create(@Body() data, @Res() res: Response) {
    try {
      return res
        .status(HttpStatus.OK)
        .json(await this.earthquakesService.create(data));
    } catch (error) {
      throw new HttpException('Controller err ', HttpStatus.BAD_REQUEST);
    }
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
      if (q != undefined) {
        result = await this.earthquakesService.searchByName(q);
      } else {
        result = await this.earthquakesService.findAllPage(page, limit);
      }
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException('Controller err ', HttpStatus.BAD_REQUEST);
    }
  }

  //Lấy theo id
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      let result = await this.earthquakesService.findOne(id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException('Controller err', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/test')
  async test() {
    let getallResult = await this.earthquakesService.getNotificate('');
    return getallResult;
  }

  //sửa
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEarthquake: UpdateEarthquakeDto,
    @Res() res: Response,
  ) {
    try {
      res
        .status(HttpStatus.OK)
        .json(await this.earthquakesService.update(id, updateEarthquake));
    } catch (error) {
      throw new HttpException('Controller error', HttpStatus.BAD_REQUEST);
    }
  }




  //phần dành cho user
  @Get("/user/get")
  async userGetEarthquakes(
    @Res() res: Response,
  ) {
    try {
      let result= await this.earthquakesService.userGetEarthquakes();
      if(result.status){
        return res.status(200).json(result);
      }
      return res.status(201).json(result);
    } catch (error) {
      return res.status(201).json({ 
        status:false,
        message:"lấy danh sách Earthquakes thất bại"
      });
    }
  }


  //get by id
  @Post("/user/getbyid") 
  async userGetbyCategoryId(
    @Res() res: Response,
    @Body() data
  ) {
    try {
      console.log("data",data);
      
      let result= await this.earthquakesService.userGetEarthquakesbyCategoryId(data)
      if(result.status){
        return res.status(200).json(result);
      }
      return res.status(201).json(result);
    } catch (error) {
      return res.status(201).json({ 
        status:false,
        message:"lấy danh sách Earthquakes theo id thất bại"
      });
    }
  }

  //
  @Post("/user/getnotification") 
  async userGetNotification(
    @Res() res: Response,
    @Body() data
  ) {
    try {
      console.log("data",data);
      
      let result= await this.earthquakesService.userGetEarthquakesbyCategoryId(data)
      if(result.status){
        return res.status(200).json(result);
      }
      return res.status(201).json(result);
    } catch (error) {
      return res.status(201).json({ 
        status:false,
        message:"lấy danh sách Earthquakes theo id thất bại"
      });
    }
  }
}
