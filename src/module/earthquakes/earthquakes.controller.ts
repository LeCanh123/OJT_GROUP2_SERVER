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
  Req,
} from '@nestjs/common';
import { EarthquakesService } from './earthquakes.service';
import { CreateEarthquakeDto } from './dto/create-earthquake.dto';
import { UpdateEarthquakeDto } from './dto/update-earthquake.dto';
import { Response, Request } from 'express';
import { EmailService, templates } from 'src/utils/mail/mail.service';

@Controller('earthquakes')
export class EarthquakesController {
  constructor(
    private readonly earthquakesService: EarthquakesService,
    private readonly mail: EmailService,
  ) {}

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

  @Get('/test/1')
  async test() {
    let getallResult = await this.earthquakesService.Testgettoken();
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

  /* Mail */
  @Post('mail')
  async sendMail(
    @Body() email: string,
    @Req() req: Request,
    @Res() res: Response,
    createEarthquakeDto: CreateEarthquakeDto,
    id: string,
  ) {
    try {
      let data = await this.earthquakesService.findAll();
      console.log('data', data);

      /* Mail */
      if (data.status) {
        this.mail.sendMail({
          subject:
            'THÔNG TIN CẢNH BÁO THIÊN TAI - HỆ THỐNG CẢNH BÁO THIÊN TAI VIỆT NAM',
          to: req.body.email,
          html: templates.sendMailUser({
            productName: 'HỆ THỐNG CẢNH BÁO THIÊN TAI VIỆT NAM',
            productWebUrl: 'http://vndms.dmc.gov.vn/',
            receiverName: 'User Name',
            title: data.data[data.data.length - 1].name,
            place: data.data[data.data.length - 1].place,
            level: Number(data.data[data.data.length - 1].level),
            timeStart: data.data[data.data.length - 1].time_start,
          }),
        });

        return res
          .status(data.status ? HttpStatus.OK : HttpStatus.ACCEPTED)
          .json(data);
      }
    } catch (err) {
      console.log('err', err);
      throw new HttpException('Controller Error', HttpStatus.BAD_REQUEST);
    }
  }



 /* Chart */
 @Post("getchart")
 async getChart(@Body() data, @Res() res: Response) {
  try {
    let result:any = await this.earthquakesService.getChart(data)
    if (result.status) {
      return res.status(200).json(result);
    }
    return res.status(201).json(result);
  } catch (error) {
    return res.status(201).json({
      status: false,
      message: 'lấy danh sách chart thất bại',
    });
  }
 }











  //phần dành cho user

  //get all earthquake
  @Get('/user/get')
  async userGetEarthquake(@Res() res: Response, @Body() data) {
    try {
      let result = await this.earthquakesService.userGetEarthquakes();
      if (result.status) {
        return res.status(200).json(result);
      }
      return res.status(201).json(result);
    } catch (error) {
      return res.status(201).json({
        status: false,
        message: 'lấy danh sách Earthquakes theo id thất bại',
      });
    }
  }

  //get earthquake by category id
  @Post('/user/getbyid')
  async userGetbyCategoryId(@Res() res: Response, @Body() data) {
    try {
      let result =
        await this.earthquakesService.userGetEarthquakesbyCategoryId(data);
      if (result.status) {
        return res.status(200).json(result);
      }
      return res.status(201).json(result);
    } catch (error) {
      return res.status(201).json({
        status: false,
        message: 'lấy danh sách Earthquakes theo id thất bại',
      });
    }
  }

  //nhận thông báo
  @Post('/user/getnotification')
  async userGetNotification(@Res() res: Response, @Body() data) {
    console.log('vào nhận thông báo');

    try {
      let result: any = await this.earthquakesService.userGetNotification(data);
      if (result.status) {
        return res.status(200).json(result);
      }
      return res.status(201).json(result);
    } catch (error) {
      return res.status(201).json({
        status: false,
        message: 'Lấy thông báo thất bại',
      });
    }
  }

  //thay đổi thời gian nhận thông báo
  @Post('/user/changetime')
  async userChangestime(@Res() res: Response, @Body() data) {
    console.log('vào thay đổi thời gian');
    console.log('data', data);

    try {
      let result: any =
        await this.earthquakesService.changeTimeNotification(data);
      if (result.status) {
        return res.status(200).json(result);
      }
      return res.status(201).json(result);
    } catch (error) {
      return res.status(201).json({
        status: false,
        message: 'lấy danh sách Earthquakes thất bại',
        //mới
      });
    }
  }
}
