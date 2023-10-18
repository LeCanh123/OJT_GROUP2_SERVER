import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ILike, Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategorysService {
  constructor(
    @Inject('CATEGORYS_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}
  //Thêm
  async create(data) {
    console.log('data', data);
    const data1 = {
      title: data.title,
      icon: data.icon,
    };
    try {
      const addCategoryResult = await this.categoryRepository.save(data1);
      return {
        status: true,
        message: 'Thêm thành công',
      };
    } catch (err) {
      console.log('err', err);
    }
  }
  //Lấy tất cả danh sách
  async findAll() {
    try {
      const category = await this.categoryRepository.find();
      return {
        data: category,
        message: 'Get ok',
      };
    } catch (error) {
      return [false, 'Model err', null];
    }
  }
  // Phân trang
  async findAllPage(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;
      const [category, total] = await this.categoryRepository.findAndCount({
        skip,
        take: limit,
      });
      const totalPage = Math.ceil(total / limit);
      return {
        data: category,
        page,
        limit,
        total,
        totalPage,
        message: 'Get ok',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Model err',
      };
    }
  }

  //Lấy theo id
  async findOne(id: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          earthquake: true,
        },
      });
      return {
        data: category,
        message: 'Get ok',
      };
    } catch (error) {
      console.log('err', error);
      return [false, 'Model err', null];
    }
  }
  //Tìm kiếm
  async searchByTitle(searchByTitle: string) {
    try {
      const category = await this.categoryRepository.find({
        where: {
          title: ILike(`%${searchByTitle}%`),
        },
      });
      return {
        data: category,
        message: 'Search ok!',
      };
    } catch (error) {
      return [false, 'Model err ', null];
    }
  }
  //Sửa
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!category) {
        return {
          success: false,
          message: 'Không tìm thấy',
        };
      }

      const updatedCategory = Object.assign(category, updateCategoryDto);
      const isTrueSet = String(updatedCategory.block).toLowerCase() === 'true';
      updatedCategory.block = isTrueSet;
      await this.categoryRepository.save(updatedCategory);

      return {
        success: true,
        message: 'Cập nhập thành công',
        data: updatedCategory,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Lỗi cập nhập',
      };
    }
  }
  //Xóa
  async remove(id: string) {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          earthquake: true,
        },
      });
      if (!category) {
        return {
          success: false,
          message: 'Category not found',
        };
      }
      await this.categoryRepository.remove(category);
      return {
        success: true,
        message: 'Category removed successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error removing category',
      };
    }
  }
}
