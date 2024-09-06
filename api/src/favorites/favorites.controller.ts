import {
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(@Query('page', ParseIntPipe) page: number) {
    console.log(page, typeof page);
    return this.favoritesService.findAll();
  }

  @Post()
  postFavorite() {
    return this.favoritesService.addFavorite();
  }

  @Delete()
  deleteFavorite(@Query('id', ParseIntPipe) id: number) {
    console.log(id, typeof id);
    return this.favoritesService.deleteFavorite();
  }
}
