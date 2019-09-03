import { Inject, Injectable } from '@nestjs/common';
import { DB_CONNECTION } from './database/constants';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(DB_CONNECTION) private readonly db,
    private readonly configService: ConfigService,
  ) {}

  // create() is automatically registered as a function (just like a stored
  // db function), but it's just a text file in /dbscripts.  Since it's in the
  // schema subfolder, this acts like a schema/namespace, so it's referenced
  // as db.schema.create()
  async createDb() {
    console.log('creating cats database');
    await this.db.schema.create();
    return { status: 'OK' };
  }

  async find(age) {
    const criteria = age ? { 'age >=': age } : {};
    return await this.db.cats.find(criteria);
  }

  // use fields option to limit columns returned
  async findOne(id: number) {
    return await this.db.cats.findOne(id, { fields: ['name', 'age', 'breed'] });
  }

  async getCount() {
    return await this.db.cats.count();
  }

  async getByName(name) {
    return await this.db.cats.where('name like $1', name);
  }

  async create(cat) {
    return await this.db.cats.save(cat);
  }

  async update(id, cat) {
    cat.id = id;
    return await this.db.cats.save(cat);
  }

  async upper(name) {
    return await this.db.uppercase_name(name);
  }

  async getCat(name) {
    return await this.db.getCat(name);
  }

  async getCatsPeople() {
    return await this.db.catsPeople([], {
      decompose: {
        pk: 'cat_id',
        columns: ['cat_id', 'cat_name', 'age', 'breed'],
        people: {
          pk: 'id',
          columns: { id: 'person_id', person_name: 'person_name' },
        },
      },
    });
  }

  async getCatPeopleJoin(id) {
    const result = await this.db.cats_people
      .join({
        cats: {
          type: 'INNER',
          on: { id: 'cat_id' },
          people: {
            type: 'INNER',
            on: { id: 'people_id' },
          },
        },
      })
      .find({});
    console.log(result);
    return result;
  }

  async saveReport(report) {
    return await this.db.saveDoc('reports', report);
  }

  async getReport(title) {
    return await this.db.reports.findDoc({
      title: title,
    });
  }
}
