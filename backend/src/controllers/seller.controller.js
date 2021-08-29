import { updateSeller } from '../services/seller.service'

export const updateSellerHandler = (receivedDbInstance) => async (req, res) => {
  const { seller_city, seller_state } = req.body
  const { seller_id } = req?.user

  if (!seller_city || !seller_state) {
    return res.status(400).json({ status: 'failed', message: 'All fields are required' })
  }

  const seller = await updateSeller(receivedDbInstance, { seller_id }, { seller_city, seller_state })

  if (!seller) {
    return res.status(403).json({
      status: 'failed',
      message: 'Not Allowed'
    })
  }

  return res.status(200).json({
    status: 'success',
    message: 'Update successful',
    updates: { newSellerCity: seller.seller_city, newSellerState: seller.seller_state }
  })
}
