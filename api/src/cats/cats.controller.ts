import { Controller, Get, Query } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.catsService.findAll(
      page ? +page : undefined,
      limit ? +limit : undefined,
    );
  }
}
