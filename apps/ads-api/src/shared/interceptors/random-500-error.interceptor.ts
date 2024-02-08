import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
} from '@nestjs/common'
import { tap } from 'rxjs/operators'


@Injectable()
export class Random500ErrorInterceptor implements NestInterceptor {
  private responsesWithoutError: number = 0

  intercept = (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      tap(() => {
        this.responsesWithoutError += 1;
        if (this.responsesWithoutError === 4) {
          this.responsesWithoutError = 0
          throw new InternalServerErrorException('An unexpected error occurred')
        }
      })
    )
  }
}
