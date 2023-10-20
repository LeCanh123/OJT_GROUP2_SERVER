import { Controller, Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
  @Inject("MESSAGE_REPOSITORY") private messages:Repository<Message>){}
 //Thêm
    async create(createMessageDto:CreateMessageDto) {    
  try {
    let newMessage= await this.messages.save(createMessageDto)
    console.log("data",newMessage);
    return {
      status:true,
      messages:"Gửi thành công ",
    }
  } catch (error) {
    console.log("err",error);
    return [false,"Model err",null]
  }
  }
//Phân trang
  async findAll(page:number,limit:number) {
   try {
    const skip=(page-1)*limit;
    const[message,total]=await this.messages.findAndCount({
      skip,
      take:limit,
    })
    const totalPage=Math.ceil(total/limit)
    return {
      data:message,
      page,
      limit,
      total,
      totalPage,
      message:"Get ok "
    }
   } catch (error) {
    console.log("err",error);
    
    return {
      status:false,
      messages:"Model err"
    }
   }
  }

  //Tìm kiếm
  async searchByMessage(searchByMessage:string){
    console.log("search",searchByMessage);
    
    try {
      let message= await this.messages.find({
        where:{
          message:ILike(`%${searchByMessage}%`)
        }
      })
      console.log("message",message);
      return{
        status:true,
        message:"Search ok",
        data:message
      }
    } catch (error) {
      console.log("search",error);
      
      return [false,"Model err",null]
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
