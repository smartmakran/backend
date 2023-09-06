import { Injectable, CanActivate, Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class SocketGuard implements CanActivate {
  @Inject() private userService: UserService;
  async canActivate(context: any): Promise<boolean> {
    try {
      const token = context.args[0].handshake.headers.authorization;
      if (!token) {
        return false;
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
      const user = await this.userService.getOrThrowError(decoded._id);
      if (!user) {
        return false;
      }
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
