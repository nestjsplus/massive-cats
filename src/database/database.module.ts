import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MassiveModule } from '@nestjsplus/massive';
import { DB_CONNECTION } from './constants';
import { ConfigService } from '../config/config.service';

const connectionFactory = {
  provide: DB_CONNECTION,
  useFactory: async (databaseService: DatabaseService) => {
    return databaseService.connect();
  },
  inject: [DatabaseService],
};

@Module({
  imports: [
    // MassiveModule.register(
    //   {
    //     host: 'localhost',
    //     port: 5432,
    //     database: 'nest',
    //     user: 'john',
    //     password: '<mypassword>',
    //   },
    //   {
    //     blacklist: ['atest'],
    //   },
    // ),
    // MassiveModule.registerAsync({
    //   useFactory: () => {
    //     return {
    //       host: 'localhost',
    //       port: 5432,
    //       database: 'nest',
    //       user: 'john',
    //       password: '<mypassword>',
    //     };
    //   },
    // }),
    MassiveModule.registerAsync(
      {
        useExisting: ConfigService,
      },
      {
        useExisting: ConfigService,
      },
    ),
  ],
  providers: [DatabaseService, connectionFactory],
  exports: [connectionFactory],
})
export class DatabaseModule {}
