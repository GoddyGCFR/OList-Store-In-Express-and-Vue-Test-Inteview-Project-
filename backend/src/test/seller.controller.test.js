import dotenv from 'dotenv'
import 'regenerator-runtime/runtime'
import request from 'supertest'
import app from '../server'

dotenv.config()

describe('/account', () => {
  describe('PATCH', () => {
    describe('Update Seller with Valid header authorization token', () => {
      test('Successful Updaterrr', async () => {
        const response = await request(app)
          .patch('/account')
          .set('authorization', 'Bearer ' + process.env.VALID_TOKEN)
          .send({ seller_city: 'Naija', seller_state: 'Lagos' })

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toContain('successful')
        expect(response.body.updates).toBeDefined()
        expect(response.body.updates).toHaveProperty('newSellerCity')
        expect(response.body.updates).toHaveProperty('newSellerState')
      })
    })

    describe('Update Seller with Valid header authorization token but empty field(s)', () => {
      test('Successful Update', async () => {
        const response = await request(app)
          .patch('/account')
          .set('authorization', 'Bearer ' + process.env.VALID_TOKEN)
          .send({ seller_city: 'Naija' })

        expect(response.statusCode).toBe(400)
        expect(response.body.status).toBe('failed')
        expect(response.body.message).toContain('required')
      })
    })

    describe('Update Seller with invalid header authorization token', () => {
      test('Successful Update', async () => {
        const response = await request(app)
          .patch('/account')
          .set('authorization', 'Bearer ' + process.env.INVALID_TOKEN)
          .send({ seller_city: 'Naija', seller_state: 'Lagos' })

        expect(response.statusCode).toBe(401)
        expect(response.body.status).toBe('failed')
        expect(response.body.message).toContain('Access denied')
      })
    })
  })

  describe('GET', () => {
    describe('Validate user session with valid token', () => {
      test('Successful user session retrieval', async () => {
        const response = await request(app)
          .get('/account')
          .set('authorization', 'Bearer ' + process.env.VALID_TOKEN)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toContain('successful')
        expect(response.body.data).toBeDefined()
        expect(response.body.data).toHaveProperty('_id')
        expect(response.body.data).toHaveProperty('seller_id')
        expect(response.body.data).toHaveProperty('seller_zip_code_prefix')
        expect(response.body.data).toHaveProperty('seller_city')
        expect(response.body.data).toHaveProperty('seller_state')
      })
    })

    describe('Validate user session with invalid token', () => {
      test('failed user session retrieval', async () => {
        const response = await request(app)
          .get('/account')
          .set('authorization', 'Bearer ' + process.env.INVALID_TOKEN)

        expect(response.statusCode).toBe(401)
        expect(response.body.status).toBe('failed')
        expect(response.body.message).toContain('Access denied')
      })
    })
  })
})
