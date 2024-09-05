import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  findAll() {
    return [
      {
        name: 'Marry',
        age: 1,
      },
      {
        name: 'Cat',
        age: 4,
      },
      {
        name: 'Angle',
        age: 5,
      },
    ];
  }
}
