import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorites.entity';
import { CreateFavoritesDto } from './dto/create-favorites.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
  ) {}

  async findOne(id: number) {
    return await this.favoritesRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async findAll(user: User, page: number = 0, limit: number = 15) {
    const favorites = await this.favoritesRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      skip: limit * page,
      take: limit,
    });

    const allFavorites = await this.favoritesRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    const formatted = favorites.map((favorite) => {
      return {
        id: favorite.id,
        cat: { id: favorite.catID, url: favorite.catUrl },
      };
    });

    const favoritesIDs = allFavorites.map((favorite) => {
      return {
        id: favorite.id,
        catID: favorite.catID,
      };
    });

    return {
      favoritesIDs,
      favorites: formatted,
    };
  }

  async addFavorite(user: User, { id, url }: CreateFavoritesDto) {
    const data = await this.favoritesRepository.save({
      user: user,
      catID: id,
      catUrl: url,
    });

    return {
      id: data.id,
      cat: {
        id: data.catID,
        url: data.catUrl,
      },
    };
  }

  async deleteFavorite(id: number) {
    const favorite = await this.findOne(id);
    const data = await this.favoritesRepository.delete(id);

    if (data) return favorite;
  }
}
