import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User1 } from './entities/user1.entity';
import MailService from 'src/services/mail';
import { Earthquake } from '../earthquakes/entities/earthquake.entity'; 
import { UserType } from './entities/user1.entity'; 
import jwt from 'src/services/jwt';
import * as bcrypt from "bcrypt"


@Injectable()
export class UsersService1 {
  constructor(
    @Inject('USER1_REPOSITORY')
    private userRepository: Repository<User1>,

  ) {}



  async facebooklogin(data) {
    console.log("data",data);
    try{
      let findUserResult=await this.userRepository.find({where:{facebookid:data.data.userID}});
      if(findUserResult.length==0){
        let createUserResult=await this.userRepository.save({
          email:data.data.email,
          name:data.data.name,
          type:UserType.Facebook,
          facebookid:data.data.userID,
          time:new Date()
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


  async googlelogin(data){
    console.log("data",data);
    try{
      let findUserResult=await this.userRepository.find({where:{googleid:data.data.profileObj.googleId}});
      console.log("findUserResult",findUserResult);
      
      if(findUserResult.length==0){
        let createUserResult=await this.userRepository.save({
          email:data.data.profileObj.email,
          name:data.data.profileObj.name,
          type:UserType.Google,
          googleid:data.data.profileObj.googleId,
          time:new Date()
        }) 
        let findUserResult=await this.userRepository.find({where:{googleid:data.data.profileObj.googleId}});
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
      console.log("err",err);
      
      return {
        status:false,
        message:"Đăng nhập thất bại",
      }
    }
  }

  async userChecktoken(token){
    

    try{
     const unpack= await jwt.verifyToken(token);
     if(!unpack){
      return {
        status:false,
        message:"Chưa đăng nhập"
      }
     }
     else{
      if(unpack.facebookid!=undefined){
        let findFacebookIdResult=await this.userRepository.findOne({where:{facebookid:unpack.facebookid}})
        if(findFacebookIdResult.facebookid){
          return {
            status:true,
            message:"Bạn là user"
          }
        }


      }


      if(unpack.googleid!=undefined){
        let findGoogleIdResult=await this.userRepository.findOne({where:{googleid:unpack.googleid}})
        if(findGoogleIdResult.googleid){
          return {
            status:true,
            message:"Bạn là user"
          }
        }
      }


      return {
        status:false,
        message:"Bạn không phải là user"
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
}