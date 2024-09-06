import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findUser() {
    return {
      id: 1,
      name: 'Polina',
      token: 'qwerty45',
    };
  }

  addUser() {
    return {
      id: 1,
      name: 'Polina',
      token: 'qwerty45',
    };
  }

  deleteUser() {
    return {
      id: 1,
    };
  }
}
