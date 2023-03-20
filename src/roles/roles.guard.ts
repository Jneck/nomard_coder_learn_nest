import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflactor: Reflector) { }
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflactor.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true;
    }
    console.log(roles);
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user)
    return matchRoles(roles, user.roles);
  }
}

function matchRoles(roles: string[], roles1: any): boolean {
  return roles === roles1;
}

