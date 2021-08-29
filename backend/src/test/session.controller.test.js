import 'regenerator-runtime/runtime'
import request from 'supertest'
import app from '../server'

describe('/account', () => {
  describe('POST: Using Valid Username and password', () => {
    test('Successful Login', async () => {
      const response = await request(app).post('/account').send({
        username: '3442f8959a84dea7ee197c632cb2df15',
        password: '13023'
      })
      expect(response.statusCode).toBe(200)
      expect(response.body.status).toBe('success')
      expect(response.body.message).toContain('successful')
      expect(response.headers['content-type']).toContain('application/json')
      expect(response.body.seller).toBeDefined()
      expect(response.body.token).toBeDefined()
    })

    describe('POST: Using Invalid Username and Password', () => {
      test('Failed Login', async () => {
        const response = await request(app).post('/account').send({
          username: '3442f8959a84dea7ee197c632cb2df15',
          password: 'InvalidPassword'
        })
        expect(response.statusCode).toBe(401)
        expect(response.body.status).toBe('failed')
        expect(response.body.message).toContain('Invalid')
        expect(response.headers['content-type']).toContain('application/json')
        expect(response.body.seller).toBeUndefined()
        expect(response.body.token).toBeUndefined()
      })
    })

    // describe('Using Usrname and password', ()=>{
    // test('Should return status code 200 ', async () => {
    //   const response = await request(app).post('/account').send({
    //     username: '3442f8959a84dea7ee197c632cb2df15',
    //     password: '13023'
    //   })
    //   expect(response.statusCode).toBe(200)
    // })
    //
    // test('Should return status = success ', async () => {
    //   const response = await request(app).post('/account').send({
    //     username: '3442f8959a84dea7ee197c632cb2df15',
    //     password: '13023'
    //   })
    //   expect(response.body.status).toBe('success')
    // })
    //
    // test('Content Type should be JSON ', async () => {
    //   const response = await request(app).post('/account').send({
    //     username: '3442f8959a84dea7ee197c632cb2df15',
    //     password: '13023'
    //   })
    //   expect(response.headers['content-type']).toContain('application/json')
    // })
    //
    // test('Seller should be defined and return an object', async () => {
    //   const response = await request(app).post('/account').send({
    //     username: '3442f8959a84dea7ee197c632cb2df15',
    //     password: '13023'
    //   })
    //   expect(response.body.seller).toBeDefined()
    // })
    //
    // test('Should Return a valid token ', async () => {
    //   const response = await request(app).post('/account').send({
    //     username: '3442f8959a84dea7ee197c632cb2df15',
    //     password: '13023'
    //   })
    //   expect(response.body.token).toBeDefined()
    // })
    // })
  })
})
