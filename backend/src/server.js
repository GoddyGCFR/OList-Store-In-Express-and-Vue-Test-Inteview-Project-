import dotenv from 'dotenv'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler'
import { decodeUser } from './middlewares/auth'
import { router } from './routes'

dotenv.config()
const app = express()

const dbState = {
  db: null
}

export const getDB = (url = process.env.DB_URL) => {
  return new Promise((resolve, reject) => {
    try {
      if (process.env.NODE_ENV !== 'test' && dbState.db) {
        return resolve(dbState.db)
      }

      MongoClient.connect(url, function (err, client) {
        if (err) {
          console.log(err)
          process.exit(1)
        }

        console.log('DB Connected')
        dbState.db = client.db(process.env.DB_NAME)
        return resolve(dbState.db)
      })
    } catch (error) {
      reject(error)
    }
  })
}

// Middlewares
app.use(decodeUser)
app.use(express.json())
app.use(cors())

// Routes
app.use('/', router(getDB))

// Error Handlers
app.use('*', notFoundHandler)
app.use(errorHandler)

// export const connDB = () => MongoClient.connect(process.env.DB_URL, async (err, client) => {
//   if (err) {
//     console.error(err)
//     process.exit(1)
//   }
//
//   console.log('Connection Successful')
//
//   const db = await client.db(process.env.DB_NAME)
//
//   // Middlewares
//   app.use(decodeUser)
//   app.use(express.json())
//   app.use(cors())
//
//   // DataBase Collections
//   const Order = await db.collection('olist_order_items')
//   const Seller = await db.collection('olist_sellers')
//
//   // Routes
//   app.get('/', (req, res) => {
//     return res.sendStatus(200)
//   })
//   app.route('/account').post(authenticateSellerHandler(Seller)).patch(authUser, updateSellerHandler(Seller)).get(authUser, getLoginStatus(Seller))
//   app.route('/order_items').get(findOrdersHandler(Order))
//   app.route('/order_items/:id').delete(authUser, deleteOrderHandler(Order)).get(findOrderHandler(Order)).patch(authUser, updateOrderHandler(Order))
//
//   // Error Handlers
//   app.use('*', notFoundHandler)
//   app.use(errorHandler)
//
//   // app.listen(process.env.SERVER_PORT, () => { console.log('Server Running') })
// })

export default app
