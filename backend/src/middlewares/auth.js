import { verifyAccessToken } from '../services/session.service'

export const authUser = (req, res, next) => {
  const { user } = req

  if (!user) {
    return res.status(401).json({
      status: 'failed',
      message: 'Access denied, please login and try again'
    })
  }

  return next()
}

export const decodeUser = (req, res, next) => {
  const requestAccessToken = req.headers.authorization?.replace(/^Bearer\s/, '')

  if (requestAccessToken) {
    const decodeResponse = verifyAccessToken(requestAccessToken)

    if (decodeResponse) {
      req.user = decodeResponse
    }
  }

  return next()
}
