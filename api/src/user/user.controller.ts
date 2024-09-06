import {
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
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
  deleteUser(@Query('id', ParseIntPipe) id: number) {
    console.log(id, typeof id);
    return this.userService.deleteUser();
  }
}
