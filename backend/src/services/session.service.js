import dotenv from 'dotenv'
import { signToken, decodeToken } from '../utils/jwt.utils'

dotenv.config()

export const createAccessToken = (session) => signToken(session, { expiresIn: process.env.JWT_TTL })

export const verifyAccessToken = (token) => decodeToken(token)
