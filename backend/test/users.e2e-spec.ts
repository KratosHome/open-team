import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { Reflector } from '@nestjs/core';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) should create a user and not return the password', async () => {
    const createUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(createUserDto.name);
    expect(response.body.email).toBe(createUserDto.email);
    expect(response.body).not.toHaveProperty('password');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
  });

  it('/users (GET) should return users without passwords', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      expect(response.body[0]).not.toHaveProperty('password');
    }
  });
});
