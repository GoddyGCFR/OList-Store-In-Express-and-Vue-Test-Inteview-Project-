import { findSeller } from '../services/seller.service'
import { createAccessToken } from '../services/session.service'

export const authenticateSellerHandler = (receivedDbInstance) => async (req, res) => {
  const { body } = req

  const { username, password } = body

  const seller = await findSeller(receivedDbInstance, { seller_id: username, seller_zip_code_prefix: password })

  if (!seller) {
    return res.status(401).json({ status: 'failed', message: 'Sorry, Invalid username or password' })
  }

  // eslint-disable-next-line camelcase
  const { seller_id } = seller

  const token = createAccessToken({ seller_id })
  req.headers.authorization = token

  return res.status(200).json({ status: 'success', message: 'Login successful', seller, token })
}

export const getLoginStatus = (receivedDbInstance) => async (req, res) => {
  const { seller_id } = req?.user

  const seller = await findSeller(receivedDbInstance, { seller_id })

  if (!seller) return res.status(401).json({ status: 'failed', message: 'Access Denied, please login with valid credentials' })

  return res.status(200).json({ status: 'success', message: 'Authentication successful', data: seller })
}
