import dotenv from 'dotenv'
import 'regenerator-runtime/runtime'
import request from 'supertest'
import app from '../server'

dotenv.config()

describe('/order_items', () => {
  describe('GET', () => {
    test('Retrieve all seller order', async () => {
      const response = await request(app)
        .get('/order_items')
        .set('authorization', 'Bearer ' + process.env.VALID_TOKEN)

      expect(response.statusCode).toBe(200)
      expect(response.body.status).toBe('success')
      expect(response.body.data).toBeDefined()
      expect(response.body.data).toBeInstanceOf(Array)
      expect(response.body.data.length).toBeGreaterThanOrEqual(0)
      expect(response.body.total).toBeDefined()
      expect(response.body.limit).toBeDefined()
      expect(response.body.offset).toBeDefined()
      expect(response.body.pagination).toBeDefined()
    })
  })
})

describe('/order_items/:id', () => {
  describe('GET', () => {
    describe('Retrieve Order with valid Order ID', () => {
      test('Successful Order retrieval', async () => {
        const response = await request(app)
          .get(`/order_items/${process.env.ORDER_ID}`)
          .set('authorization', 'Bearer ' + process.env.VALID_TOKEN)

        expect(response.statusCode).toBe(200)
        expect(response.body.status).toContain('success')
        expect(response.body.order).toBeDefined()
        expect(response.body.order).toHaveProperty('_id')
        expect(response.body.order).toHaveProperty('order_id')
        expect(response.body.order).toHaveProperty('seller_id')
        expect(response.body.order).toHaveProperty('order_item_id')
        expect(response.body.order).toHaveProperty('price')
        expect(response.body.order).toHaveProperty('freight_value')
      })
    })

    describe('Update Order with valid ID', () => {
      test('Successful Update', async () => {
        const response = await request(app)
          .patch(`/order_items/${process.env.ORDER_ID}`)
          .set('authorization', 'Bearer ' + process.env.VALID_TOKEN)
          .send({ price: 111.22, freight_value: 12.3136 })

        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe('success')
        expect(response.body.message).toContain('Update Success')
        expect(response.body.order).toBeDefined()
        expect(response.body.order).toBeInstanceOf(Object)
        expect(response.body.order).toHaveProperty('_id')
        expect(response.body.order).toHaveProperty('order_id')
        expect(response.body.order).toHaveProperty('price')
        expect(response.body.order).toHaveProperty('freight_value')
      })
    })

    describe('Delete Order with valid ID', () => {
      test('Successful Delete', async () => {
        const response = await request(app)
          .delete(`/order_items/${process.env.ORDER_ID}`)
          .set('authorization', 'Bearer ' + process.env.VALID_TOKEN)

        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe('success')
        expect(response.body.message).toContain('deleted')
      })
    })

    describe('Retrieve Order with invalid ID', () => {
      test('failed order retrieval', async () => {
        const response = await request(app)
          .get(`/order_items/${process.env.ORDER_ID}`)
          .set('authorization', 'Bearer ' + process.env.VALID_TOKEN)

        expect(response.statusCode).toBe(404)
        expect(response.body.status).toBe('failed')
        expect(response.body.message).toContain('not found')
        expect(response.body.order).toBeNull()
      })
    })

    describe('Update Order with invalid ID', () => {
      test('Failed Update', async () => {
        const response = await request(app)
          .patch(`/order_items/${process.env.ORDER_ID}`)
          .set('authorization', 'Bearer ' + process.env.VALID_TOKEN)
          .send({ price: 111.22, freight_value: 12.3136 })

        expect(response.statusCode).toBe(404)
        expect(response.body.status).toBe('failed')
        expect(response.body.message).toContain('not found')
        expect(response.body.order).toBeNull()
      })
    })

    describe('Delete Order with invalid ID', () => {
      test('Failed Delete', async () => {
        const response = await request(app)
          .delete(`/order_items/${process.env.ORDER_ID}`)
          .set('authorization', 'Bearer ' + process.env.VALID_TOKEN)

        expect(response.statusCode).toBe(404)
        expect(response.body.status).toBe('failed')
        expect(response.body.message).toContain('not exist')
      })
    })
  })
})
