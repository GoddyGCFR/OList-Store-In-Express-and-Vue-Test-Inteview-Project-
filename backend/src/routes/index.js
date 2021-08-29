import { Router } from 'express'
import { authenticateSellerHandler, getLoginStatus } from '../controllers/session.controller'
import { authUser } from '../middlewares/auth'
import { updateSellerHandler } from '../controllers/seller.controller'
import { deleteOrderHandler, findOrderHandler, findOrdersHandler, updateOrderHandler } from '../controllers/order.controller'

export const router = (dbInstance) => {
  const router = Router()

  router.route('/account').post(authenticateSellerHandler(dbInstance)).patch(authUser, updateSellerHandler(dbInstance)).get(authUser, getLoginStatus(dbInstance))
  router.route('/order_items').get(findOrdersHandler(dbInstance))
  router.route('/order_items/:id').delete(authUser, deleteOrderHandler(dbInstance)).get(findOrderHandler(dbInstance)).patch(authUser, updateOrderHandler(dbInstance))

  return router
}
