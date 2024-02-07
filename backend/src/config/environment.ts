import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT
export const MONGODB_URI = process.env.MONGODB_URI
export const JWT_SECRET = process.env.JWT_SECRET || 'secret para typescript'
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN