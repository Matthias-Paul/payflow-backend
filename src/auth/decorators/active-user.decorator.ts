import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { ActiveUsertype } from 'src/interfaces/active-user.interfaces';

type RequestWithActiveUser = Request & {
  user?: ActiveUsertype;
};

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUsertype | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithActiveUser>();
    const user = request.user;
    return field ? user?.[field] : user;
  },
);
