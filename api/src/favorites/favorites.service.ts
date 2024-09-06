import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  findAll() {
    return [
      {
        id: 1,
        name: 'Marry',
        age: 1,
      },
      {
        id: 2,
        name: 'Cat',
        age: 4,
      },
      {
        id: 3,
        name: 'Angle',
        age: 5,
      },
    ];
  }

  addFavorite() {
    return {
      id: 1,
      name: 'Marry',
      age: 1,
    };
  }

  deleteFavorite() {
    return {
      id: 1,
    };
  }
}
