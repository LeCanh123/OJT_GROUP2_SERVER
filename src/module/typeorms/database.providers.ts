import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      try {
        const dataSource = new DataSource({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '',
          database: 'nhom2',
          entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
          synchronize: false, 
        });
        await dataSource.initialize();
        return dataSource;
      } catch (err) {
        // console.log("err",err);

        console.log('Lỗi kết nối database');
      }
    },
  },
];
