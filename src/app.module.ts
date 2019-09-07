import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { MassiveModule } from '@nestjsplus/massive';
import * as path from 'path';

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
    //
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
