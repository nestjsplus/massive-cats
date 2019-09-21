import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { MassiveModule } from '@nestjsplus/massive';
import * as path from 'path';
import { camelizeColumnNames } from './camelize-functions';
import { ConfigManagerModule } from '@nestjsplus/config';

/**
 * Demonstrates several different methods of configuring the MassiveModule
 */
@Module({
  // =================================================================
  // Option 1 - Static registration.  Configure connectionOptions,
  // configOptions and driverOptions
  //
  // ( Update to use your connection credentials :)  )
  // =================================================================
  // imports: [
  //   MassiveModule.register(
  //     {
  //       user: 'john',
  //       password: 'password',
  //       host: 'localhost',
  //       port: 5432,
  //       database: 'nest',
  //     },
  //     {
  //       scripts: path.resolve(__dirname, '../', 'dbscripts'),
  //     },
  //     {
  //       query: e => {
  //         console.log('Query> ', e.query);
  //       },
  //     },
  //   ),
  // ],
  // =================================================================
  // Option 2 - Dynamic registration re-using a ConfigService provider that
  // may have been provided elsewhere
  //
  // Note, this example only configures the connectOptions, and
  // configOptions and uses default values for driverOptions
  // =================================================================
  imports: [
    MassiveModule.registerAsync(
      {
        useExisting: ConfigService,
        // imports: [ConfigModule],
      },
      {
        useExisting: ConfigService,
        // imports: [ConfigModule],
      },
    ),
    ConfigModule,
  ],
  // =================================================================
  // Option 3 - Dynamic registration instantiating a new ConfigService
  // provider for connectOptions
  //
  // =================================================================
  // imports: [
  //   MassiveModule.registerAsync({
  //     useClass: ConfigService,
  //   }),
  // ],
  // =================================================================
  // Option 4 - instantiate a configService inside the MassiveModule
  // to provide it with custom configuration service
  //
  // Note, this example only configures the connectOptions, and uses
  // default values for configOptions and driverOptions
  // =================================================================
  // imports: [
  //   MassiveModule.registerAsync({
  //     useFactory: configService => {
  //       return configService.createMassiveConnectOptions();
  //     },
  //     inject: [ConfigService],
  //     imports: [ConfigModule],
  //   }),
  // ],
  // =================================================================
  // Option 5 - use factory with a static factory method
  //
  // Note, this example only configures the connectOptions, and uses
  // default values for configOptions and driverOptions
  // =================================================================
  // imports: [
  //   MassiveModule.registerAsync({
  //     useFactory: () => {
  //       return {
  //         user: 'john',
  //         password: 'password',
  //         host: 'localhost',
  //         port: 5432,
  //         database: 'nest',
  //       };
  //     },
  //   }),
  // ],
  //
  // Configurations that specify optional driverOptions
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
