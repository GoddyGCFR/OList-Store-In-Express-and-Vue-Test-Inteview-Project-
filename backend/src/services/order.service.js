
export const findOrders = async (dbInstanceFromController, filter, options) => {
  const db = await dbInstanceFromController()
  const OrderCollection = await db.collection('olist_order_items')
  if (options) return await OrderCollection.find(filter).sort({ [options.sortBy]: options.sortValue }).skip(options.itemsToDisplay).limit(options.limit).toArray()

  return await OrderCollection.countDocuments(filter)
}

export const findOrder = async (dbInstanceFromController, filter) => {
  const db = await dbInstanceFromController()
  const OrderCollection = await db.collection('olist_order_items')
  return await OrderCollection.findOne(filter)
}

export const deleteOrder = async (dbInstanceFromController, filter) => {
  const db = await dbInstanceFromController()
  const OrderCollection = await db.collection('olist_order_items')

  return await OrderCollection.deleteOne(filter)
}

export const updateOrder = async (dbInstanceFromController, filter, query) => {
  const db = await dbInstanceFromController()
  const OrderCollection = await db.collection('olist_order_items')

  const newData = {}

  newData.price = +query.price || 0
  newData.freight_value = +query.freight_value || 0

  const { value } = await OrderCollection.findOneAndUpdate(filter, { $set: newData }, { returnDocument: 'after' })

  return value
}
