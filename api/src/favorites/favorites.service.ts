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
    console.log(
      await this.favoritesRepository.findOne({
        where: { id },
        relations: { user: true },
      }),
    );
    return await this.favoritesRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async findAll(user: User, page: number = 0, limit: number = 10) {
    return await this.favoritesRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      skip: limit * page,
      take: limit,
    });
  }

  async addFavorite(user: User, { id, url }: CreateFavoritesDto) {
    return await this.favoritesRepository.save({
      user: user,
      catID: id,
      catUrl: url,
    });
  }

  async deleteFavorite(id: number) {
    return await this.favoritesRepository.delete(id);
  }
}
