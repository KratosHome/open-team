import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { Reflector } from '@nestjs/core';
import { UserRole } from './../src/users/enums/user-role.enum';

interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  projectRoles: string[];
  createdAt: string;
  updatedAt: string;
}

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let httpServer: Parameters<typeof request>[0];

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
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    await app.init();
    httpServer = app.getHttpServer() as Parameters<typeof request>[0];
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

    const response = await request(httpServer)
      .post('/users')
      .send(createUserDto)
      .expect(201);
    const body = response.body as UserResponse;

    expect(body).toHaveProperty('id');
    expect(body.name).toBe(createUserDto.name);
    expect(body.email).toBe(createUserDto.email);
    expect(body.role).toBe(UserRole.USER);
    expect(body.projectRoles).toEqual([]);
    expect(body).not.toHaveProperty('password');
    expect(body).toHaveProperty('createdAt');
    expect(body).toHaveProperty('updatedAt');
  });

  it('/users (GET) should return users without passwords', async () => {
    const response = await request(httpServer).get('/users').expect(200);
    const body = response.body as UserResponse[];

    expect(Array.isArray(body)).toBe(true);
    if (body.length > 0) {
      expect(body[0]).not.toHaveProperty('password');
      expect(body[0]).toHaveProperty('role');
      expect(body[0]).toHaveProperty('projectRoles');
    }
  });

  it('/users/:id/role (PATCH) should update the user role', async () => {
    const createUserDto = {
      name: 'Role Switch User',
      email: 'role-switch@example.com',
      password: 'password123',
    };

    const createdResponse = await request(httpServer)
      .post('/users')
      .send(createUserDto)
      .expect(201);
    const createdUser = createdResponse.body as UserResponse;

    const updateResponse = await request(httpServer)
      .patch(`/users/${createdUser.id}/role`)
      .send({ role: UserRole.ADMIN })
      .expect(200);
    const updatedUser = updateResponse.body as UserResponse;

    expect(updatedUser.id).toBe(createdUser.id);
    expect(updatedUser.role).toBe(UserRole.ADMIN);
    expect(updatedUser.email).toBe(createUserDto.email);
  });
});
