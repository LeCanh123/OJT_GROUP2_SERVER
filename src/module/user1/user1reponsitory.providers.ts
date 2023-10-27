import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity'; 

export const userReponsitoryProviders1 = [
  {
    provide: 'USER1_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      try {
        return dataSource.getRepository(User);
      } catch (err) {
        console.log('Chưa kết nối database');
      }
    },
    inject: ['DATA_SOURCE'],
  },
];
