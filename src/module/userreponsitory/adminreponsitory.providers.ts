import { DataSource } from 'typeorm';
import { Admin } from '../users/entities/admin.entity';

export const adminReponsitoryProviders = [
  {
    provide: 'ADMIN_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      try {
        return dataSource.getRepository(Admin);
      } catch (err) {
        console.log('Chưa kết nối database');
      }
    },
    inject: ['DATA_SOURCE'],
  },
];
