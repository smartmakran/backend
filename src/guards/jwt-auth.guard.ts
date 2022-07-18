import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export class JwtAuthGuard extends AuthGuard('jwt') {
  private reflector: Reflector;

  constructor(reflector: Reflector) {
    super();
    this.reflector = reflector;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    return isPublic ? Promise.resolve(true) : super.canActivate(context);
  }

  handleRequest(error, user) {
    if (error || !user) {
      throw (
        error ||
        new UnauthorizedException('دسترسی غیرمجاز است، لطفا دوباره وارد شوید.')
      );
    }
    return user;
  }
}
