import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLikesDto } from './dto/create-likes.dto';
import { User } from '../users/entities/user.entity';
import { Like } from './entities/favorites.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly favoritesRepository: Repository<Like>,
  ) {}

  async findOne(id: number) {
    return await this.favoritesRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async findAll(user: User, page: number = 0, limit: number = 15) {
    const likes = await this.favoritesRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      skip: limit * page,
      take: limit,
    });

    const allLikes = await this.favoritesRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    const formatted = likes.map((like) => {
      return {
        id: like.id,
        cat: { id: like.catID, url: like.catUrl },
      };
    });

    const favoritesIDs = allLikes.map((favorite) => {
      return {
        id: favorite.id,
        catID: favorite.catID,
      };
    });

    return {
      favoritesIDs,
      favorites: formatted,
      pageCount: Math.ceil(favoritesIDs.length / limit),
    };
  }

  async addLike(user: User, { id, url }: CreateLikesDto) {
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

  async deleteLike(id: number) {
    const favorite = await this.findOne(id);
    const data = await this.favoritesRepository.delete(id);

    if (data) return favorite;
  }
}
