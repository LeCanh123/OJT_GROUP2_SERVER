import { Inject, Injectable } from '@nestjs/common';
import { CreateEarthquakeDto } from './dto/create-earthquake.dto';
import { UpdateEarthquakeDto } from './dto/update-earthquake.dto';
import { ILike, Repository } from 'typeorm';
import { Earthquake } from './entities/earthquake.entity';
import { log } from 'console';
import { Category } from '../categorys/entities/category.entity';


@Injectable()
export class EarthquakesService {
  constructor(
    @Inject('EARTHQUAKES_REPOSITORY')
    private earthquakeRepository: Repository<Earthquake>,
    @Inject('CATEGORYS_REPOSITORY')
    private categoryRepository: Repository<Category>,



  ) {}
  //Thêm
  async create(data: any) {
    console.log('data', data);
    try {
      const currentTime = new Date();
      const data1: any = {
        name: data.name,
        lat: data.lat,
        lng: data.lng,
        size: data.size,
        level: data.level,
        place: data.place,
        categorys: { id: data.CategoryId },
        time: currentTime,
      };
      const categorys = await this.earthquakeRepository.save(data);
      console.log('ok');
    } catch (err) {
      console.log('err', err);
    }
    return {
      status: true,
      data: data,
      message: 'Thêm thành công ',
    };
  }

  // Phân trang
  async findAllPage(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;
      const [earthquake, total] = await this.earthquakeRepository.findAndCount({
        skip,
        take: limit,
      });
      const totalPage = Math.ceil(total / limit);
      return {
        data: earthquake,
        page,
        limit,
        totalPage,
        message: 'Get ok',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Model err',
      };
    }
  }

  //Lấy tất cả dang sách
  async getAll() {
    try {
      let getAllMap = await this.earthquakeRepository.find();
      console.log('getAllMap', getAllMap);
      return {
        status: true,
        data: getAllMap,
      };
    } catch (err) {
      console.log('err', err);
    }
    // return `This action removes a # map`;
  }

  //lấy thông báo cho người dùng
  async getNotificate(data: any) {
    const targetDate = new Date('2023-10-12T03:51:34.000Z');
    const query = this.earthquakeRepository
      .createQueryBuilder('Map')
      .where('Map.time > :targetDate', { targetDate })
      .getMany();
    query
      .then((results) => {
        console.log('results', results); // Kết quả đã lọc được
      })
      .catch((error) => {
        console.error(error); // Xử lý lỗi nếu có
      });
  }

  //Lấy theo id
  async findOne(id: string) {
    log('id', id);
    try {
      let earthquake = await this.earthquakeRepository.findOne({
        where: { id: id },
        relations: { categorys: true },
      });
      console.log('ee', earthquake);
      return {
        data: earthquake,
        message: 'Get Ok',
      };
    } catch (error) {
      return [false, 'Model Err', null];
    }
  }

  //Tìm kiếm
  async searchByName(searchByName: string) {
    try {
      let earthquake = this.earthquakeRepository.find({
        where: {
          name: ILike(`%${searchByName}`),
        },
      });
      return {
        data: earthquake,
        message: 'Search OK!',
      };
    } catch (error) {
      return [false, 'Model err', null];
    }
  }

  //Sửa
  async update(id: string, updateCategoryDto: UpdateEarthquakeDto) {
    try {
      let earthquake = await this.earthquakeRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!earthquake) {
        return {
          success: false,
          message: 'Không tìm thấy',
        };
      }
      let updatedEarthquake = Object.assign(earthquake, updateCategoryDto);
      return {
        success: true,
        message: 'Cập nhập thành công',
        data: updatedEarthquake,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Lỗi cập nhập',
      };
    }
  }





  //user userGetEarthquakes
    //get all
  async userGetEarthquakes(){
    try {
      let userGetEarthquakes = await this.earthquakeRepository.find( {where:{block:false},relations: ['categorys']});
      // console.log('getAllMap', userGetEarthquakes);
      return {
        status: true,
        message:"lấy danh sách Earthquakes thành công",
        data: userGetEarthquakes,
      };
    } catch (err) {
      return {
        status: false,
        message:"lấy danh sách Earthquakes thất bại",
        data: null,
      };
    }


  }
    //get by category
  async userGetEarthquakesbyCategoryId(data){
    console.log("vào by category",data);
    
    try {
      //
      let getCategorybyId= await this.earthquakeRepository.find( {
        where:{block:false,categorys:{id:data.categoryId}},
        relations: ['categorys']});



      let userGetEarthquakes = await this.earthquakeRepository.find( {where:{block:false,categorys:{id:data.categoryId}},relations: ['categorys']});
      // console.log('getAllMap', userGetEarthquakes);
      return {
        status: true,
        message:"lấy danh sách Earthquakes thành công",
        data: userGetEarthquakes,
      };
    } catch (err) {
      return {
        status: false,
        message:"lấy danh sách Earthquakes thất bại",
        data: null,
      };
    } 


  }
}
