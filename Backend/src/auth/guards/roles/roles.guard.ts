import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'; //read metadeta like @Role('admin)
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // get the role required by the route
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // if no roles are required, allow access
    if (!requiredRoles) {
      return true;
    }

    //get the authenticated user form the request
    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;

    // No authenticated user
    if (!user) {
      return false;
    }

    // check whether the user's role matches one of the required roles
    return requiredRoles.includes(user.role);
  }
}
