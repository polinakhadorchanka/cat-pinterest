import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cat } from './entities/cats.entity';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class CatsService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(page: number = 0, limit: number = 10): Promise<Cat[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<Cat[]>('https://api.thecatapi.com/v1/images/search', {
          params: {
            page,
            limit,
            api_key: process.env.API_KEY,
          },
        })
        .pipe(
          catchError(() => {
            throw new InternalServerErrorException("Couldn't find the cats");
          }),
        ),
    );
    return data;
  }
}
