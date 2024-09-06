import { Controller, Delete, Get, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post()
  postFavorite() {
    return this.favoritesService.addFavorite();
  }

  @Delete()
  deleteFavorite() {
    return this.favoritesService.deleteFavorite();
  }
}
