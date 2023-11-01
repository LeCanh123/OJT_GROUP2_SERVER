import { Inject, Injectable } from '@nestjs/common';
import { Equal, ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { take } from 'rxjs';
import MailService from 'src/services/mail';
import { Earthquake } from '../earthquakes/entities/earthquake.entity';
import { UserType } from './entities/user.entity';
import jwt from 'src/services/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async facebooklogin(data) {
    console.log('data', data);
    try {
      let findUserResult = await this.userRepository.find({
        where: { facebookid: Equal(data.data.userID) },
      });
      if (findUserResult.length == 0) {
        let createUserResult = await this.userRepository.save({
          email: data.data.email,
          name: data.data.name,
          type: UserType.Facebook,
          facebookid: data.data.userID,
          time: new Date(),
        });
        let findUserResult = await this.userRepository.find({
          where: { facebookid: Equal(data.data.userID) },
        });
        let token = await jwt.createTokenforever({ ...findUserResult[0] });
        return {
          status: true,
          message: 'Đăng nhập thành công',
          token,
        };
      } else {
        let token = await jwt.createTokenforever({ ...findUserResult[0] });
        return {
          status: true,
          message: 'Đăng nhập thành công',
          token,
        };
      }
    } catch (err) {
      return {
        status: false,
        message: 'Đăng nhập thất bại',
      };
    }
  }

  async googlelogin(data) {
    console.log('data', data);
    try {
      let findUserResult = await this.userRepository.find({
        where: { googleid: Equal(data.data.profileObj.googleId) },
      });
      console.log('findUserResult', findUserResult);

      if (findUserResult.length == 0) {
        let createUserResult = await this.userRepository.save({
          email: data.data.profileObj.email,
          name: data.data.profileObj.name,
          type: UserType.Google,
          googleid: data.data.profileObj.googleId,
          time: new Date(),
        });
        let findUserResult = await this.userRepository.find({
          where: { googleid: Equal(data.data.profileObj.googleId) },
        });
        let token = await jwt.createTokenforever({ ...findUserResult[0] });
        return {
          status: true,
          message: 'Đăng nhập thành công',
          token,
        };
      } else {
        let token = await jwt.createTokenforever({ ...findUserResult[0] });
        return {
          status: true,
          message: 'Đăng nhập thành công',
          token,
        };
      }
    } catch (err) {
      console.log('err', err);

      return {
        status: false,
        message: 'Đăng nhập thất bại',
      };
    }
  }

  async userChecktoken(token) {
    try {
      const unpack = await jwt.verifyToken(token);
      if (!unpack) {
        return {
          status: false,
          message: 'Chưa đăng nhập',
        };
      } else {
        if (unpack.facebookid != undefined) {
          let findFacebookIdResult = await this.userRepository.findOne({
            where: { facebookid: Equal(unpack.facebookid) },
          });
          if (findFacebookIdResult.facebookid) {
            return {
              status: true,
              message: 'Bạn là user',
            };
          }
        }

        if (unpack.googleid != undefined) {
          let findGoogleIdResult = await this.userRepository.findOne({
            where: { googleid: Equal(unpack.googleid) },
          });
          if (findGoogleIdResult.googleid) {
            return {
              status: true,
              message: 'Bạn là user',
            };
          }
        }

        return {
          status: false,
          message: 'Bạn không phải là user',
        };
      }
    } catch (err) {
      console.log('err', err);

      return {
        status: false,
        message: 'Lỗi hệ thống',
      };
    }
  }
  //phân trang
  async fillAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    try {
      console.log('skip', skip);
      console.log(' take', take);

      let [users, total] = await this.userRepository.findAndCount({
        skip,
        take: limit,
        order: { id: 'DESC' },
      });
      const totalPage = Math.ceil(total / limit);
      return {
        page,
        limit,
        totalPage,
        data: users,
        message: 'Lấy tất cả danh sách thành công!',
      };
    } catch (error) {
      console.log('err', error);
      return {
        status: false,
        data: null,
        message: 'Model err',
      };
    }
  }
  //tìm kiếm
  async searchByName(searchByName: string) {
    try {
      let listUser = await this.userRepository.find({
        where: {
          name: ILike(`%${searchByName}%`),
        },
      });
      return {
        data: listUser,
        message: 'Search OK !',
      };
    } catch (error) {
      return [false, 'Model err', null];
    }
  }

  async getAllUser() {
    try {
      const users = await this.userRepository.find();
      return {
        status: true,
        data: users,
        message: 'Lấy danh sách user thành công',
      };
    } catch (err) {
      console.log('err', err);
      return {
        status: false,
        data: null,
        message: 'Lỗi Service',
      };
    }
  }
}
