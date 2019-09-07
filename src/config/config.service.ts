import { Injectable } from '@nestjs/common';
import { ConfigManager } from '@nestjsplus/config';
import * as Joi from '@hapi/joi';
import {
  MassiveConfigOptions,
  MassiveConnectOptions,
  MassiveDriverOptions,
} from '@nestjsplus/massive';
import * as path from 'path';

import { camelizeColumnNames } from '../camelize-functions';

@Injectable()
export class ConfigService extends ConfigManager {
  // Our custom "schema"
  // We supply it to the ConfigManager by extending the
  // ConfigManager class and implementing the
  // provideConfigSpec() method, which simply returns
  // our custom schema
  provideConfigSpec() {
    return {
      host: {
        validate: Joi.string(),
        required: false,
        default: 'localhost',
      },
      port: {
        validate: Joi.number()
          .min(5000)
          .max(65535),
        required: false,
        default: 5432,
      },
      user: {
        validate: Joi.string(),
        required: true,
      },
      password: {
        validate: Joi.string(),
        required: true,
      },
      database: {
        validate: Joi.string(),
        required: true,
      },
    };
  }

  createMassiveConnectOptions(): MassiveConnectOptions {
    return {
      host: this.get<string>('host'),
      port: this.get<number>('port'),
      database: this.get<string>('database'),
      user: this.get<string>('user'),
      password: this.get<string>('password'),
      poolSize: 30,
    };
  }

  createMassiveConfigOptions(): MassiveConfigOptions {
    return {
      scripts: path.resolve(__dirname, '../..', 'dbscripts'),
    };
  }

  /**
   * see pg-promise initialization options for details
   * https://vitaly-t.github.io/pg-promise/module-pg-promise.html
   */

  // createMassiveDriverOptions(): MassiveDriverOptions {
  //   return {
  //     query: (e) => {
  //       console.log('Query > ', e.query);
  //     },
  //   };
  // }

  // createMassiveDriverOptions(): MassiveDriverOptions {
  //   return {
  //     receive: (data, result, e) => {
  //       camelizeColumnNames(data);
  //     },
  //   };
  // }
}
