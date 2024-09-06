import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return {
      id: 1,
      name: 'Polina',
      token: 'qwerty45',
    };
  }

  find(id: number) {
    return {
      id: 1,
      name: 'Polina',
      token: 'qwerty45',
    };
  }

  remove(id: number) {
    return {
      id: 1,
    };
  }
}
