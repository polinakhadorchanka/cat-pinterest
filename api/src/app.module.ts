import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [CatsModule, UserModule, FavoritesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
