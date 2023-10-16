import { Inject, Injectable } from '@nestjs/common';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { Repository } from 'typeorm';
import { Map } from './entities/map.entity';

//map api
import mapapi from 'src/services/mapApi/mapapi';


@Injectable()
export class MapsService {
  constructor(
    @Inject('MAPS_REPOSITORY')
    private mapRepository: Repository<Map>,
  ) {}




  demochangelocation(){
    mapapi.conver();
  }




  async create(data:any) {
    console.log("data",data);
    
    try{
      const currentTime = new Date();
      const currentTimeString = currentTime.toString();
      let data1:any={
        name:data.name,
        locationx:data.locationx,
        locationy:data.locationy,
        block:"null",
        size:data.size,
        country: data.country,
        categorys:{id:data.CategoryId},
        time:currentTime
        }
      const categorys=await this.mapRepository.save(data1);
      console.log("ok");
      
    } 
    catch(err){ 
console.log("err",err); 

    }
    return 'This action adds a new map';
  }

  update(data) {
    return `This action updates a # map`;
  }

  remove(data) {
    return `This action removes a # map`;
  }

  async getAll() {

    try{

      let getAllMap= await this.mapRepository.find({where:{block:"null"},relations: ['categorys']})
      console.log("getAllMap",getAllMap);
      
      return {
        status:true,
        data:getAllMap
      }
    }
    catch(err){
console.log("err",err);

    }
    // return `This action removes a # map`;
  }


  //lấy thông báo cho người dùng
  
  async getNotificate(data:any) {
    const targetDate = new Date('2023-10-12T03:51:34.000Z');
    const query = this.mapRepository.createQueryBuilder("Map")
  .where('Map.time > :targetDate', { targetDate })
  .getMany();

query.then(results => {
  console.log("results",results); // Kết quả đã lọc được
}).catch(error => {
  console.error(error); // Xử lý lỗi nếu có
});
  }



}
