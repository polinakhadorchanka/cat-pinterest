import { Controller, Delete, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findUser() {
    return this.userService.findUser();
  }

  @Post()
  postUser() {
    return this.userService.addUser();
  }

  @Delete()
  deleteUser() {
    return this.userService.deleteUser();
  }
}
