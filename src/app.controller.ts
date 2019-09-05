import { Controller, Get, Param, Query, Post, Body, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('create')
  createDb() {
    return this.appService.createDb();
  }

  // find all/by min age
  //
  // get localhost:3000/cats
  // get localhost:3000/cats?age=8
  @Get()
  findAll(@Query('age') age: number) {
    return this.appService.find(age);
  }

  // count
  //
  // get localhost:3000/cats/count
  @Get('count')
  getCount() {
    return this.appService.getCount();
  }

  // custom where
  //
  // get localhost:3000/cats/name/felix
  @Get('name/:name')
  getFelix(@Param('name') name: string) {
    return this.appService.getByName(name);
  }

  // find one
  //
  // get localhost:3000/cats/id/1
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.appService.findOne(id);
  }

  // massive save() - as create; returns newly created cat
  //
  // (HTTPie) http POST localhost:3000/cats name=Fred age:=3 breed='Alley Cat'
  @Post()
  create(@Body() cat) {
    return this.appService.create(cat);
  }

  // massive save() - as update; returns updated cat
  //
  // (HTTPie) http PUT localhost:3000/cats/4 name=Freddy
  @Put(':id')
  update(@Param('id') id, @Body() cat) {
    return this.appService.update(id, cat);
  }

  // call regular DB stored function
  //
  // get localhost:3000/cats/upper/lolcat
  @Get('upper/:name')
  uppercase(@Param('name') name: string) {
    return this.appService.upper(name);
  }

  // call (local filesystem) script function with param (as if a stored DB function)
  //
  // get localhost:3000/cats/scat/felix
  @Get('scat/:name')
  scat(@Param('name') name: string) {
    return this.appService.getCat(name);
  }

  // use `decompose` feature to flatten normalized join query results into
  // nested JSON object
  //
  // get localhost:3000/cats/people
  @Get('people')
  getCatsPeople() {
    return this.appService.getCatsPeople();
  }

  // test using join syntax (WIP - not quite working yet :) )
  @Get('people/:catid')
  join(@Param('catid') catid: number) {
    return this.appService.getCatPeopleJoin(catid);
  }

  /**
   * Documents (like MongoDB)
   *
   * see https://massivejs.org/docs/working-with-documents
   */

  // save a document (creating the schema if it doesn't exist)
  //
  // (HTTPie) http POST localhost:3000/cats/report
  @Post('report')
  saveReport() {
    const report = {
      title: 'diet',
      lines: [
        {
          name: 'Felix',
          meals: [
            {
              day: 'Monday',
              food: [{ breakfast: 'mice' }, { lunch: 'kibble' }],
            },
          ],
        },
        {
          name: 'Garfield',
          meals: [
            {
              day: 'Monday',
              food: [{ breakfast: 'birds' }, { lunch: 'tuna' }],
            },
          ],
        },
      ],
    };
    return this.appService.saveReport(report);
  }

  // retrieve a document by title property
  //
  // GET localhost:3000/cats/report/diet
  @Get('report/:title')
  getReport(@Param('title') title: string) {
    return this.appService.getReport(title);
  }
}
