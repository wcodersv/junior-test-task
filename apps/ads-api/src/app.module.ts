import { Module, ValidationPipe } from '@nestjs/common'
import { APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core'
import { AdsModule } from './ads'
import { Random500ErrorInterceptor, RandomPauseInterceptor } from './shared/interceptors'

@Module({
  imports: [AdsModule],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ transform: true }),
    },
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new RandomPauseInterceptor(),
    },
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new Random500ErrorInterceptor(),
    },
  ],
})
export class AppModule {}
