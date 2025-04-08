import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { it } from 'node:test'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/api/v1/photo (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/v1/photo')
      .send({
        title: 'test',
        description: 'test',
        url: 'test',
        views: 0
      })
      .expect(201)
      .expect((res) => {  
        expect(res.body).toEqual({
          title: 'test',
          description: 'test',
          url: 'test',
          views: 0,
        })
      }
    )
  })
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.text).toEqual('Hello World!')
      })
  })
  
})
