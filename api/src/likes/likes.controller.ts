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
import { LikesService } from './likes.service';
import { CreateLikesDto } from './dto/create-likes.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CanDeleteGuard } from '../guards/canDelete.guard';

@Controller('favorites')
export class LikesController {
  constructor(private readonly favoritesService: LikesService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Request() { user }: any,
  ) {
    return this.favoritesService.findAll(
      user,
      page ? +page : undefined,
      limit ? +limit : undefined,
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createFavoritesDto: CreateLikesDto, @Request() { user }: any) {
    return this.favoritesService.addLike(user, createFavoritesDto);
  }

  @Delete()
  @UseGuards(AuthGuard, CanDeleteGuard)
  delete(@Query('id', ParseIntPipe) id: number) {
    return this.favoritesService.deleteLike(id);
  }
}
