/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('GET /users/get-user-balance/:id', () => {
    it('should return "ok" for valid user', () => {
      return request(app.getHttpServer())
        .get('/users/get-user-balance/1')
        .expect(200)
        .expect('ok');
    });

    it('should return 403 if user is banned', () => {
      return request(app.getHttpServer())
        .get('/users/get-user-balance/5')
        .expect(403)
        .expect((res) => {
          expect(res.body.message).toContain('Пользователь с id: 5 - забанен');
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
