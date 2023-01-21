import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

/**
 * @notice Guard는 request를 진행할지 말지를 결정한다.
 * authentication은 누가 지원을 요청하는지를 확인하는 과정이다.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  // canActivate는 boolean을 return 해야한다. true면 request를 진행하고 false면 request를 멈춘다.
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // context는 http request와 graphql request가 있다.
    // graphql request는 context에 user정보가 담겨있다.
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];

    if (!user) {
      return false;
    }
    return true;
  }
}
