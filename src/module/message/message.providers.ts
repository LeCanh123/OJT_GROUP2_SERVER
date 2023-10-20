import { DataSource } from "typeorm";
import { Message } from "./entities/message.entity";

export const messageProviders=[
    {
        provide:"MESSAGE_REPOSITORY",
        useFactory: (dataSource: DataSource) => {
            try {
              return dataSource.getRepository(Message);
            } catch (err) {
              console.log("Chưa kết nối database");
            }
          },
          inject: ['DATA_SOURCE'],
        },
      ];