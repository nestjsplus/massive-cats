import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { MassiveModule } from '@nestjsplus/massive';
import * as path from 'path';
import { camelizeColumnNames } from './camelize-functions';
/**
 * Demonstrates several different methods of configuring the MassiveModule
 */

@Module({
  imports: [
    // =================================================================
    // Option 1 - Static registration
    //
    // ( Update to use your connection credentials :)  )
    // =================================================================
    MassiveModule.register(
      {
        user: 'john',
        password: 'password',
        host: 'localhost',
        port: 5432,
        database: 'nest',
      },
      {
        scripts: path.resolve(__dirname, '../', 'dbscripts'),
      },
      // {
      //   query: e => {
      //     console.log('Query> ', e.query);
      //   },
      // },
    ),
    // =================================================================
    // Option 2 - Dynamic registration re-using a ConfigService provider that
    // may have been provided elsewhere
    // =================================================================
    //
    // MassiveModule.registerAsync(
    //   {
    //     useExisting: ConfigService,
    //   },
    //   {
    //     useExisting: ConfigService,
    //   },
    // ),
    // ConfigModule,
    // //
    // =================================================================
    // Option 3 - instantiate a configService inside the MassiveModule
    // to provide it with custom configuration service
    // =================================================================
    // MassiveModule.registerAsync({
    //   useFactory: configService => {
    //     return configService.createMassiveConnectOptions();
    //   },
    //   inject: [ConfigService],
    //   imports: [ConfigModule],
    // }),
    //
    // =================================================================
    // Option 1a (with driverOptions) - Static registration with driver options
    //
    // ( Update to use your connection credentials :)  )
    // =================================================================
    // MassiveModule.register(
    //   {
    //     user: 'john',
    //     password: 'password',
    //     host: 'localhost',
    //     port: 5432,
    //     database: 'nest',
    //   },
    //   {
    //     scripts: path.resolve(__dirname, '../', 'dbscripts'),
    //   },
    //   {
    //     receive: (data, result, e) => {
    //       camelizeColumnNames(data);
    //     },
    //   },
    // ),
    // =================================================================
    // Option 2a (with driverOptions) - Dynamic registration re-using a ConfigService
    // provider that may have been provided elsewhere, and including a
    // driver config object
    // =================================================================
    //
    // MassiveModule.registerAsync(
    //   {
    //     useExisting: ConfigService,
    //   },
    //   {
    //     useExisting: ConfigService,
    //   },
    //   {
    //     useExisting: ConfigService,
    //   },
    // ),
    // ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
