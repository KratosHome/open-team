import { createServer } from 'node:net';
import {
  ClassSerializerInterceptor,
  type INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

function getPortConfig() {
  const configuredPort = process.env.PORT?.trim();
  const parsedPort = Number.parseInt(configuredPort || '29465', 10);

  return {
    isFixed: configuredPort !== undefined && configuredPort !== '',
    preferredPort: Number.isNaN(parsedPort) ? 29465 : parsedPort,
  };
}

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = createServer();

    server.unref();
    server.once('error', () => resolve(false));
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
  });
}

async function resolvePort(preferredPort: number): Promise<number> {
  let port = preferredPort;

  while (!(await isPortAvailable(port))) {
    port += 1;
  }

  return port;
}

function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('OpenTeam Backend API')
    .setDescription(
      'OpenAPI contract for the OpenTeam backend. Use these docs from the frontend to inspect request bodies, response payloads, and validation rules.',
    )
    .setVersion('1.0.0')
    .addTag('users', 'User management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'OpenTeam API Docs',
    jsonDocumentUrl: 'docs/openapi.json',
  });
}

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const { isFixed, preferredPort } = getPortConfig();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  setupSwagger(app);
  const listenPort = isFixed ? preferredPort : await resolvePort(preferredPort);

  if (!isFixed && listenPort !== preferredPort) {
    logger.warn(
      `Port ${preferredPort} is in use. Listening on ${listenPort} instead.`,
    );
  }

  await app.listen(listenPort);
  const appUrl = await app.getUrl();

  logger.log(`Application is running at ${appUrl}`);
  logger.log(`Swagger UI is available at ${appUrl}/docs`);
  logger.log(`OpenAPI JSON is available at ${appUrl}/docs/openapi.json`);
}
bootstrap();
