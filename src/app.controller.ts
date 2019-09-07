import { Controller, Get, Param, Query, Post, Body, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * For each route handler, there's an (HTTPie - https://httpie.org) query
   * to conveniently run it from a terminal prompt, shown just above the handler
   */

  // seed the db
  //
  // http get localhost:3000/cats/create
  @Get('create')
  createDb() {
    return this.appService.createDb();
  }

  // find all/by min age
  //
  // http get localhost:3000/cats
  // http get localhost:3000/cats?age=8
  @Get()
  findAll(@Query('age') age: number) {
    return this.appService.find(age);
  }

  // count
  //
  // http get localhost:3000/cats/count
  @Get('count')
  getCount() {
    return this.appService.getCount();
  }

  // custom where
  //
  // http get localhost:3000/cats/name/felix
  @Get('name/:name')
  getFelix(@Param('name') name: string) {
    return this.appService.getByName(name);
  }

  // find one
  //
  // http get localhost:3000/cats/id/1
  @Get('id/:id')
  findOne(@Param('id') id: number) {
    return this.appService.findOne(id);
  }

  // massive save() - as create; returns newly created cat
  //
  // http POST localhost:3000/cats name=Fred age:=3 breed='Alley Cat'
  @Post()
  create(@Body() cat) {
    return this.appService.create(cat);
  }

  // massive save() - as update; returns updated cat
  //
  // http PUT localhost:3000/cats/4 name=Freddy
  @Put(':id')
  update(@Param('id') id, @Body() cat) {
    return this.appService.update(id, cat);
  }

  // call regular DB stored function
  //
  // http get localhost:3000/cats/upper/lolcat
  @Get('upper/:name')
  uppercase(@Param('name') name: string) {
    return this.appService.upper(name);
  }

  // call (local filesystem) script function with param (as if a stored DB function)
  //
  // http get localhost:3000/cats/scat/felix
  @Get('scat/:name')
  scat(@Param('name') name: string) {
    return this.appService.getCat(name);
  }

  // use `decompose` feature to flatten normalized join query results into
  // nested JSON object
  //
  // http get localhost:3000/cats/people
  @Get('people')
  getCatsPeople() {
    return this.appService.getCatsPeople();
  }

  // test using join syntax (WIP - not quite working yet :) )
  //
  // http get localhost:3000/cats/people/1
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
  // http post localhost:3000/cats/report
  @Post('report')
  saveReport() {
    /**
     * create a complex nested object to save
     */
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
  // http get localhost:3000/cats/report/diet
  @Get('report/:title')
  getReport(@Param('title') title: string) {
    return this.appService.getReport(title);
  }

  /**
   * Messing around with camel case
   *
   * See app.service.ts for corresponding functions/notes
   *
   * Note that there's a driverOption key 'receive' which
   * can be set to apply a function to camelCase column
   * names in results.  It does interact with other methods
   * of dealing with camelCasing. See app.service.ts for
   * more.
   */

  // Use this version **without** turning on the driver option
  //
  // http get localhost:3000/cats/camel1
  @Get('camel1')
  getCamel1() {
    return this.appService.getCatsPeopleCamelize1();
  }

  // Use this version **with** the driver option (receive) turned on
  //
  // http get localhost:3000/cats/camel2
  @Get('camel2')
  getCamel2() {
    return this.appService.getCatsPeopleCamelize2();
  }

  // This one just uses Massive's native "exprs" feature to alias
  // columns.  Use **without** the driver option
  //
  // http get localhost:3000/cats/camel3
  @Get('camel3')
  getCamel3() {
    return this.appService.findCatsPeopleCamel();
  }
}
