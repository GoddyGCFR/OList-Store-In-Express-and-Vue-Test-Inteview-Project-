export const findSeller = async (dbInstanceFromController, input) => {
  const db = await dbInstanceFromController()
  const SellerCollection = await db.collection('olist_sellers')
  return SellerCollection.findOne(input)
}

export const updateSeller = async (dbInstanceFromController, filter, query) => {
  const db = await dbInstanceFromController()
  const SellerCollection = await db.collection('olist_sellers')

  const { value } = await SellerCollection.findOneAndUpdate(filter, { $set: query }, { returnDocument: 'after' })

  return value
}
