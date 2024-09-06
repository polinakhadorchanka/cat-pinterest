import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create() {
    const token = uuid();

    return await this.usersRepository.save({
      token,
    });
  }

  async find(id: number) {
    return await this.usersRepository.findOne({
      where: { id: id },
    });
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
