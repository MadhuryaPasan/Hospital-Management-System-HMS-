import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { Role } from 'src/common/enums/role.enum';

export const ApiRoles = (...roles: Role[]) =>
  applyDecorators(
    ApiOperation({
      description: `Required role: ${roles.join(', ')}`,
    }),
  );
