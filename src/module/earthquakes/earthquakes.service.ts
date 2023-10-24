import { Inject, Injectable } from '@nestjs/common';
import { CreateEarthquakeDto } from './dto/create-earthquake.dto';
import { UpdateEarthquakeDto } from './dto/update-earthquake.dto';
import { ILike, Repository } from 'typeorm';
import { Earthquake } from './entities/earthquake.entity';
import { log } from 'console';
import { Category } from '../categorys/entities/category.entity';
import { User } from '../users/entities/user.entity';
import MailService from 'src/services/mail';
import jwt from 'src/services/jwt';

@Injectable()
export class EarthquakesService {
  constructor(
    @Inject('EARTHQUAKES_REPOSITORY')
    private earthquakeRepository: Repository<Earthquake>,
    @Inject('CATEGORYS_REPOSITORY')
    private categoryRepository: Repository<Category>,
    @Inject('USERRPS_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  // Admin
  //Thêm
  async create(data: CreateEarthquakeDto) {
    try {
      const categorys = await this.earthquakeRepository.save(data);
      return {
        status: true,
        data: categorys,
        message: 'Thêm mới thiên tai thành công!',
      };
    } catch (err) {
      return {
        status: false,
        data: null,
        message: 'Thêm mới thiên tai thất bại!',
      };
    }
  }

  async findAll() {
    let result = await this.earthquakeRepository.find();
    return {
      status: true,
      data: result,
      message: 'Lay danh sach thanh cong',
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
        message: 'Lấy tất cả danh sách thành công!',
      };
    } catch (error) {
      return {
        status: false,
        message: 'Lấy tất cả danh sách thất bại!',
        data: null,
      };
    }
  }

  //Lấy tất cả dang sách
  // async getAll() {
  //   try {
  //     let getAllMap = await this.earthquakeRepository.find();

  //     return {
  //       status: true,
  //       message: 'Lấy tất cả danh sách thành công!',
  //       data: getAllMap,
  //     };
  //   } catch (err) {
  //     console.log('err', err);
  //     return {
  //       status: false,
  //       message: 'Lấy tất cả danh sách thất bại!',
  //       data: null,
  //     };
  //   }
  // }

  //lấy thông báo cho người dùng
  async getNotificate(data: any) {
    const targetDate = new Date('2023-10-12T03:51:34.000Z');
    const query = this.earthquakeRepository
      .createQueryBuilder('Map')
      .where('Map.time > :targetDate', { targetDate })
      .getMany();
    query
      .then((results) => {})
      .catch((error) => {
        console.error(error); // Xử lý lỗi nếu có
      });
  }
  // //Lấy theo id
  // async findOne(id: string) {
  //   log('id', id);
  //   try {
  //     let earthquake = await this.earthquakeRepository.findOne({
  //       where: { id: id },
  //       relations: { categorys: true },
  //     });
  //     console.log('ee', earthquake);
  //     return {
  //       data: earthquake,
  //       message: 'Get Ok',
  //     };
  //   } catch (error) {
  //     return [false, 'Model Err', null];
  //   }
  // }

  // //Tìm kiếm
  // async searchByName(searchByName: string) {
  //   try {
  //     let earthquake = this.earthquakeRepository.find({
  //       where: {
  //         name: ILike(`%${searchByName}`),
  //       },
  //     });
  //     return {
  //       data: earthquake,
  //       message: 'Search OK!',
  //     };
  //   } catch (error) {
  //     return [false, 'Model err', null];
  //   }
  // }
  //Lấy theo id

  async findOne(id: string) {
    log('id', id);
    try {
      let earthquake = await this.earthquakeRepository.findOne({
        where: { id: id },
        relations: { categorys: true },
      });
      return {
        status: true,
        message: 'Lấy danh sách thành công!',
        data: earthquake,
      };
    } catch (error) {
      return {
        status: false,
        message: 'Lấy danh sách thất bại!',
        data: null,
      };
    }
  }
  catch(error) {
    return [false, 'Model Err', null];
  }
  //Tìm kiếm
  async searchByName(searchByName: string) {
    try {
      let earthquake = await this.earthquakeRepository.find({
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
      const isTrueSet =
        String(updatedEarthquake.block).toLowerCase() === 'true';
      updatedEarthquake.block = isTrueSet;
      await this.earthquakeRepository.save(updatedEarthquake);
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

  //phần dành cho user
  //user userGetEarthquakes
  //get all
  async userGetEarthquakes() {
    try {
      let userGetEarthquakes = await this.earthquakeRepository.find({
        where: { block: false },
        relations: ['categorys'],
      });
      // console.log('getAllMap', userGetEarthquakes);
      return {
        status: true,
        message: 'lấy danh sách Earthquakes thành công',
        data: userGetEarthquakes,
      };
    } catch (err) {
      return {
        status: false,
        message: 'lấy danh sách Earthquakes thất bại',
        data: null,
      };
    }
  }
  //get by category
  async userGetEarthquakesbyCategoryId(data) {
    try {
      //
      let getCategorybyId = await this.earthquakeRepository.find({
        where: { block: false, categorys: { id: data.categoryId } },
        relations: ['categorys'],
      });

      let userGetEarthquakes = await this.earthquakeRepository.find({
        where: { block: false, categorys: { id: data.categoryId } },
        relations: ['categorys'],
      });
      return {
        status: true,
        message: 'lấy danh sách Earthquakes thành công',
        data: userGetEarthquakes,
      };
    } catch (err) {
      return {
        status: false,
        message: 'lấy danh sách Earthquakes thất bại',
        data: null,
      };
    }
  }

  //nhận thông báo
  async userGetNotification(data) {
    const targetDate = new Date('2023-10-12T03:51:34.000Z');
    const query = this.earthquakeRepository
      .createQueryBuilder('Earthquake')
      .where('Earthquake.time_notification > :targetDate', { targetDate })
      .getMany();

    return query
      .then((results) => {
        // console.log("results",results);
        // Kết quả đã lọc được,
        return {
          status: true,
          message: 'Lấy thông báo thành công',
          data: results,
        };
      })
      .catch((error) => {
        return {
          status: false,
          message: 'Lấy thông báo thất bại',
          data: null,
        };
        // console.error(error); // Xử lý lỗi nếu có
      });
  }

  //thay đổi thời gian user xem thông báo
  async changeTimeNotification(data) {
    //thay đổi thời gian đọc thông báo của user
    //giải nén
    // const unpack= await jwt.verifyToken(data.token);
    // if(!unpack){

    // }
    try {
      const currentTime = new Date();
      let changeTimeResult = await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ time: currentTime })
        .where('id = :id', { id: '33378f43-671e-11ee-8359-b07b254d818e' })
        .execute();
    } catch (err) {}
  }

  //gửi email cho user
  async sendEmail(data) {
    //lấy danh sách trong database

    try {
      let getUserEmail = await this.userRepository.find();
      getUserEmail.map(async (item: any) => {
        //gửi mail
        await MailService.sendMail({
          to: item.email,
          subject: 'Thông Báo Thiên Tai',
          html: `<div>Có thiên tai ở vị trí x y</div>`,
        });
        return;
      });
      return {
        status: true,
        message: 'Gửi tin nhắn thành công',
      };
    } catch (err) {
      return {
        status: false,
        message: 'Gửi tin nhắn thất bại',
      };
    }
  }
}
