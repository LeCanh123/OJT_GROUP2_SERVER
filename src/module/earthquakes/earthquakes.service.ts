import { Inject, Injectable } from '@nestjs/common';
import { CreateEarthquakeDto } from './dto/create-earthquake.dto';
import { UpdateEarthquakeDto } from './dto/update-earthquake.dto';
import { Repository } from 'typeorm';
import { Earthquake } from './entities/earthquake.entity';
@Injectable()
export class EarthquakesService {
  constructor(
    @Inject('EARTHQUAKES_REPOSITORY')
    private earthquakeRepository: Repository<Earthquake>,
  ) {}

  

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
      const categorys=await this.earthquakeRepository.save(data1);
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

      let getAllMap= await this.earthquakeRepository.find({where:{block:"null"},relations: ['categorys']})
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
    const query = this.earthquakeRepository.createQueryBuilder("Map")
  .where('Map.time > :targetDate', { targetDate })
  .getMany();

query.then(results => {
  console.log("results",results); // Kết quả đã lọc được
}).catch(error => {
  console.error(error); // Xử lý lỗi nếu có
});
  }



}
