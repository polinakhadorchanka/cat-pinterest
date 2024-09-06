import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
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
}
