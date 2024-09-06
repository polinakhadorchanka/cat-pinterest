import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(@Query('page', ParseIntPipe) page: number) {
    console.log(page, typeof page);
    return this.catsService.findAll();
  }
}
