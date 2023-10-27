import { DataSource } from 'typeorm';
import { User1 } from './entities/user1.entity';

export const userReponsitoryProviders1 = [
  {
    provide: 'USER1_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      try {
        return dataSource.getRepository(User1);
      } catch (err) {
        console.log('Chưa kết nối database');
      }
    },
    inject: ['DATA_SOURCE'],
  },
];
