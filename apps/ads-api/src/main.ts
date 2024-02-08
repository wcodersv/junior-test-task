import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { version, name, description } from '@/package.json'
import { Logger } from '@nestjs/common'
import { PaginatedResponseDto } from './shared/dto'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  const port = process.env.PORT || 8080;
  const swaggerPrefix = 'swagger'

  app.use(cookieParser())

  const options = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .build()
  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [PaginatedResponseDto],
  })
  SwaggerModule.setup(swaggerPrefix, app, document)
  await app.listen(port)
  const serverAddress = `http://localhost:${port}`;
  Logger.log(
    `🚀 Application is running on: ${serverAddress}/${globalPrefix}`
  );
  Logger.log(`Swagger is available at ${serverAddress}/${swaggerPrefix}`)
}

bootstrap()
