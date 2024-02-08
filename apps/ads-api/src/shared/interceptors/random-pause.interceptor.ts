import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { delay } from 'rxjs/operators'


@Injectable()
export class RandomPauseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const pause = Math.floor(Math.random() * 3) * 1000;
    return next.handle().pipe(delay(pause))
  }
}
