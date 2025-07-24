import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';

describe('Ideas API (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await disconnect();
  });

  it('POST /ideas - should create a new idea', async () => {
    const res = await request(app.getHttpServer())
      .post('/ideas')
      .send({ idea: 'Landing page for bakery' })
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('idea', 'Landing page for bakery');
    expect(res.body).toHaveProperty('sections');
    expect(Array.isArray(res.body.sections)).toBe(true);
    expect(res.body.sections).toEqual(['Hero', 'About', 'Contact']);
    createdId = res.body._id;
  });

  it('GET /ideas/:id - should return the created idea', async () => {
    const res = await request(app.getHttpServer())
      .get(`/ideas/${createdId}`)
      .expect(200);

    expect(res.body).toHaveProperty('_id', createdId);
    expect(res.body).toHaveProperty('idea', 'Landing page for bakery');
    expect(res.body.sections).toEqual(['Hero', 'About', 'Contact']);
  });

  it('POST /ideas - should fail with missing idea', async () => {
    const res = await request(app.getHttpServer())
      .post('/ideas')
      .send({})
      .expect(400);

    expect(res.body.message).toEqual(["idea must be a string", "idea should not be empty"]);
  });

  it('GET /ideas/:id - should 404 for non-existent id', async () => {
    await request(app.getHttpServer())
      .get('/ideas/000000000000000000000000')
      .expect(404);
  });
});
