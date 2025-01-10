import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { TypeOrmFilter } from './filters/typeorm-error.filter';

async function bootstrap() {
  const port = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new TypeOrmFilter(app.get(HttpAdapterHost)));

  SwaggerModule.setup(
    'api/swagger',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .addServer(`http://localhost:${port}`)
        .setTitle('Ethereum App')
        .setDescription('API endpoints for the Ethereum APP')
        .setVersion('1.0')
        .build(),
    ),
  );

  await app.listen(port, () => {
    new Logger('Bootstrap').verbose(
      `Server is running on http://localhost:${port}`,
    );
  });
}
bootstrap();
