import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @Inject('ADMIN_REPOSITORY')
    private adminRepository: Repository<Admin>,
  ) {}

  async findByUserNameAndPassword(userName: string, password: string): Promise<Admin | null> {
    
    const admin = await this.adminRepository.findOne({ where: { userName, password } });
    console.log("admin.userName",admin.userName);
    console.log("admin.password",admin.password);
    
    

    return admin || null;
  }
}