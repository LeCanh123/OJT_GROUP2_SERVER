import { DataSource } from 'typeorm';
import { Category } from './entities/category.entity';

export const categorysProviders = [
  {
    provide: 'CATEGORYS_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      try {
        return dataSource.getRepository(Category);
      } catch (err) {
        console.log('Chưa kết nối database');
        return null;
      }
    },
    inject: ['DATA_SOURCE'],
  },
];
