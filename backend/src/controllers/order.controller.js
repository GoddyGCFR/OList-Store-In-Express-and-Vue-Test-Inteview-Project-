import { deleteOrder, findOrder, findOrders, updateOrder } from '../services/order.service'

export const findOrdersHandler = (receivedDbInstance) => async (req, res) => {
  const { seller_id } = req?.user
  const ITEMS_PER_PAGE = req?.query?.limit
  const limit = parseInt(ITEMS_PER_PAGE && ITEMS_PER_PAGE <= 100 && ITEMS_PER_PAGE) || 20
  // offset is the page number
  const offset = parseInt(req?.query?.page, 10) || 1
  // const offset = parseInt(req?.query?.offset, 10) || 1
  const sortBy = req?.query?.sort || 'shipping_limit_date'
  const sortValue = parseInt(req?.query?.sortValue) || -1

  // Pagination
  const pagination = {}
  const total = await findOrders(receivedDbInstance, { seller_id })
  const startIndex = (offset - 1) * limit
  const endIndex = offset * limit

  if (endIndex < total - 1) {
    pagination.next = offset + 1
  }

  if (startIndex > 0) {
    pagination.prev = offset - 1
  }

  const orders = await findOrders(receivedDbInstance, { seller_id }, { limit, itemsToDisplay: startIndex, sortBy, sortValue })

  return res.status(200).json({ status: 'success', data: orders, total, totalOnCurrentPage: orders.length, limit, offset, pagination })
}

export const deleteOrderHandler = (receivedDbInstance) => async (req, res) => {
  const { seller_id } = req?.user
  const { id } = req?.params

  const deletedOrder = await deleteOrder(receivedDbInstance, { seller_id, order_id: id })

  if (!deletedOrder?.deletedCount) {
    return res.status(404).json({ status: 'failed', message: 'Order may not exist or might have been deleted previously' })
  }

  return res.status(200).json({ status: 'success', message: 'Order deleted' })
}

export const findOrderHandler = (receivedDbInstance) => async (req, res) => {
  const { seller_id } = req?.user
  const { id } = req?.params
  const order = await findOrder(receivedDbInstance, { order_id: id })

  if (!order) {
    return res.status(404).json({ status: 'failed', message: 'Order not found', order })
  }

  return res.status(200).json({ status: 'success', order, owner: seller_id.toString() === order.seller_id.toString() })
}

export const updateOrderHandler = (receivedDbInstance) => async (req, res) => {
  const { body } = req
  const { id } = req?.params
  const { seller_id } = req?.user

  const order = await updateOrder(receivedDbInstance, { seller_id, order_id: id }, body)

  if (!order) {
    return res.status(404).json({ status: 'failed', message: 'Order not found', order: order })
  }

  return res.status(200).json({ status: 'success', message: 'Update Success', order: order })
}
