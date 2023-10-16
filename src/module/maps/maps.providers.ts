import { DataSource } from 'typeorm';
import { Map } from './entities/map.entity'; 

export const mapsProviders = [
  {
    provide: 'MAPS_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      try {
        return dataSource.getRepository(Map);
      } catch (err) {
        console.log("Chưa kết nối database");
      }
    },
    inject: ['DATA_SOURCE'],
  },
];