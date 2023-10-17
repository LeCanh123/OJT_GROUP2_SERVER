import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import MailService from 'src/services/mail';
import { Earthquake } from '../earthquakes/entities/earthquake.entity'; 


@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('EARTHQUAKES_REPOSITORY')
    private earthquakeRepository: Repository<Earthquake>,

  ) {}



  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
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
