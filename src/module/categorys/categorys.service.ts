import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategorysService {
  constructor(
    @Inject('CATEGORYS_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}


  async create(data) {
    console.log("data",data);
    let data1={
      type:data.type,
      block:"null",
      image:data.image 
    }
    try{

      let addCategoryResult=await this.categoryRepository.save(data1);

return {
  status:true,
  message:"Thêm category thành công"
}
    }
    catch(err){

    }
  }


  async getall(data) {
    console.log("data",data);
    
    try{

      let getCategoryResult=await this.categoryRepository.find({where:{block:"null"}});

    return {
      status:true,
      message:"Lấy category thành công",
      data:getCategoryResult
    }
    }
    catch(err){

    }
  }


  async delete(data) {
    console.log("data",data);
    
    try{

      let deleteCategoryResult=await this.categoryRepository
                                      .createQueryBuilder()
                                      .update(Category)
                                      .set({ block: "true"})
                                      .where("id = :id", { id: data.id })
                                      .execute()

    return {
      status:true,
      message:"Xoá category thành công",
      // data:getCategoryResult
    }
    }
    catch(err){

    }
  }

  findAll() {
    return `This action returns all categorys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
