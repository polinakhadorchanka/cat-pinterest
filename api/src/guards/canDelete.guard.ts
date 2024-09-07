import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class CanDeleteGuard implements CanActivate {
  constructor(private readonly favoritesService: FavoritesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { user, query } = request;

    const favoriteOwnerID = await this.favoritesService.findOne(query.id);

    if (!favoriteOwnerID) throw new BadRequestException('Bad request');

    return user.id === favoriteOwnerID.user.id;
  }
}
