import { DataSource } from 'typeorm';
import { Earthquake } from './entities/earthquake.entity'; 

export const earthquakeProviders = [
  {
    provide: 'EARTHQUAKES_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      try {
        return dataSource.getRepository(Earthquake);
      } catch (err) {
        console.log("Chưa kết nối database");
      }
    },
    inject: ['DATA_SOURCE'],
  },
];