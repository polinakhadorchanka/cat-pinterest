import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoritesDto } from './dto/create-favorites.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CanDeleteGuard } from '../guards/canDelete.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query('page', ParseIntPipe) page: number, @Request() { user }: any) {
    return this.favoritesService.findAll(user, page);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createFavoritesDto: CreateFavoritesDto,
    @Request() { user }: any,
  ) {
    return this.favoritesService.addFavorite(user, createFavoritesDto);
  }

  @Delete()
  @UseGuards(AuthGuard, CanDeleteGuard)
  deleteFavorite(@Query('id', ParseIntPipe) id: number) {
    return this.favoritesService.deleteFavorite(id);
  }
}
