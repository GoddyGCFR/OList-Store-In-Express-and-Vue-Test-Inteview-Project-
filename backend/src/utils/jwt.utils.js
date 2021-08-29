import dotenv from 'dotenv'

import { verify, sign } from 'jsonwebtoken'

dotenv.config()

const secret = process.env.JWT

export const signToken = (object, options) => sign(object, secret, options)

export const decodeToken = (token) => {
  try {
    return verify(token, secret)
  } catch (err) {
    return false
  }
}
