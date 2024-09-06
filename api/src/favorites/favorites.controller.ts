import {
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '../conception/guards/auth.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query('page', ParseIntPipe) page: number) {
    console.log(page, typeof page);
    return this.favoritesService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  postFavorite() {
    return this.favoritesService.addFavorite();
  }

  @Delete()
  @UseGuards(AuthGuard)
  deleteFavorite(@Query('id', ParseIntPipe) id: number) {
    console.log(id, typeof id);
    return this.favoritesService.deleteFavorite();
  }
}
