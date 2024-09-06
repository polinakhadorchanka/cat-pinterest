import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers.authorization;

    if (!auth) throw new UnauthorizedException('Unauthorized');

    const bearerToken: string[] = auth.split(' ');
    const token = bearerToken[1];

    const user = await this.usersService.getUserByToken(token);

    if (user) {
      request.user = user;
      return true;
    } else return false;
  }
}
