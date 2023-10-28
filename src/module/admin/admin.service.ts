import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import * as bcrypt from "bcrypt"
import jwt from 'src/services/jwt';


@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_REPOSITORY')
    private adminRepository: Repository<Admin>,
  ) {}

  async findByUserNameAndPassword(userName: string, password: string){
    
    try{
      const admin:any = await this.adminRepository.findOne({ where: { userName} });
      console.log("admin",admin);
      
      let isCorrectPassword=await bcrypt.compare(password,admin.password);
      console.log("admin.password",admin.password);
      
      if(isCorrectPassword){
        let token=await jwt.createTokenforever({...admin});
        return {
          status:true,
          message:"Đăng nhập admin thành công",
          token:token
        }
      }
      return {
        status:false,
        message:"Sai tài khoản hoặc mật khẩu"
      }

    }
    catch(err){
      console.log("err",err);
      
      return {
        status:false,
        message:"Đăng nhập admin thất bại"
      }
    }
    

  }

  async adminChecktoken(token){
    

    try{
     const unpack= await jwt.verifyToken(token);
     if(!unpack){
      return {
        status:false,
        message:"Chưa đăng nhập"
      }
     }
     else{
      let findAdminResult=await this.adminRepository.findOne({where:{userName:unpack.userName}})
      if(findAdminResult.userName){
        return {
          status:true,
          message:"Bạn là admin"
        }
      }
     }
    }
    catch(err){
      console.log("err",err);
      
      return {
        status:false,
        message:"Lỗi hệ thống"
      }
    }
    

  }

  async adminRegister(){
    // http://localhost:3000/api/v1/admin/register
    const userName="admin"
    const plainPassword="123456"
    // console.log("process.env.saltRounds",process.env.saltRounds);
    const saltRounds = 10;
    try{
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
      const adminResult = await this.adminRepository.save({
        userName:userName,
        password:hashedPassword
      });
      return {
        status:true,
        message:"Đăng kí tài khoản admin thành công",
        data:{
          userName:userName,
          password:plainPassword
        }
      }
    }
    catch(err){
      console.log("err",err); 
      
      return {
        status:false,
        message:"Đăng kí tài khoản admin thất bại"
      }
    }
  }

}