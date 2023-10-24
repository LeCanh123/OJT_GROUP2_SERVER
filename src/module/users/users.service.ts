import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import MailService from 'src/services/mail';
import { Earthquake } from '../earthquakes/entities/earthquake.entity'; 
import { UserType } from './entities/user.entity';
import jwt from 'src/services/jwt';
import { Admin } from './entities/admin.entity';
import * as bcrypt from "bcrypt"


@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('ADMIN_REPOSITORY')
    private adminRepository: Repository<Admin>,

  ) {}



  async facebooklogin(data) {
    console.log("data",data);
    try{
      let findUserResult=await this.userRepository.find({where:{facebookid:data.data.userID}});
      if(findUserResult.length==0){
        let createUserResult=await this.userRepository.save({
          email:data.data.email,
          type:UserType.Facebook,
          facebookid:data.data.userID,
        }) 
        let findUserResult=await this.userRepository.find({where:{facebookid:data.data.userID}});
        let token=await jwt.createTokenforever({...findUserResult[0]});
        return {
          status:true,
          message:"Đăng nhập thành công",
          token
        }
      }
      else{
        let token=await jwt.createTokenforever({...findUserResult[0]});
        return {
          status:true,
          message:"Đăng nhập thành công",
          token
        }
      }
    }
    catch(err){
      return {
        status:false,
        message:"Đăng nhập thất bại",
      }
    }
  }


  async googlelogin(data){}



  async adminlogin(data){
    // http://localhost:3000/api/v1/users/adminlogin
        try{
          let findAdminResult=await this.adminRepository.find({where:{username:data.username}})
          console.log("findAdminResult",findAdminResult);
          if(findAdminResult.length==0){
                return {
                  status:false,
                  message:"Đăng nhập thất bại"
                } 
          }else{
            // const oldpassword="$2b$10$oz75JTrRS169ur375Y36zexFHQijjbakTs1pwXIcGzxGsFyHESJOW"
            let isCorrectPassword=await bcrypt.compare(data.password,findAdminResult[0].password);
            if(isCorrectPassword){
              let token=await jwt.createTokenforever({...findAdminResult[0]});
              return {
                status:true,
                message:"Đăng nhập thành công",
                token:token
              }
            }else{
              return {
                status:false,
                message:"Đăng nhập thất bại"
              } 
            }

          }
        }
        catch(err){
          return {
            status:false,
            message:"Đăng nhập thất bại"
          } 
        }
  }



  //kiểm tra gửi thông báo user
  checkNotification(){
    //giải nén user

    //tìm thời gian xem thông báo của user

    //lọc thông báo sau thời gian của user xem và trả về
    const currentTime = new Date();
    const currentTimeString = currentTime.toString();

    // Lưu currentTimeString vào cơ sở dữ liệu
    // Lấy currentTimeString từ cơ sở dữ liệu

    const savedTime = new Date(currentTimeString);
    const elapsedTime = Date.now() - savedTime.getTime();
    console.log(`Thời gian đã trôi qua: ${elapsedTime}ms`);






  }


  //thay đổi thời gian user xem thông báo
  async changeTimeNotification(data){
    //thay đổi thời gian đọc thông báo của user

try{
  const currentTime = new Date();
  let changeTimeResult=await this.userRepository
  .createQueryBuilder()
  .update(User)
  .set({ time: currentTime})
  .where("id = :id", { id: "33378f43-671e-11ee-8359-b07b254d818e" })
  .execute()

}
catch(err){

}



  }




  //admin

  //gửi email cho user
  async sendEmail(data){
  //lấy danh sách trong database

  

try{
  let getUserEmail=await this.userRepository.find();
  console.log("getUserEmail",getUserEmail);
  getUserEmail.map(async (item:any)=>{
  //gửi mail
  await MailService.sendMail({
    to: item.email,
    subject: "Thông Báo Thiên Tai",
    html: `<div>Có thiên tai ở vị trí x y</div>`
  })
  return



  })
  return {
    status:true,
    message:"Gửi tin nhắn thành công"
  }

}
catch(err){
  return {
    status:false,
    message:"Gửi tin nhắn thất bại"
  }
}


  }









  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
