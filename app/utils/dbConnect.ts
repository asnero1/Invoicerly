// app/utils/dbConnect.ts

import mongoose from 'mongoose'

let isConnected: boolean = false

export const dbConnect = async () => {
  if (isConnected) return

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || '', {
      dbName: 'invoicerly',
    })

    isConnected = true
    console.log('âœ… MongoDB connected')
  } catch (err) {
    console.error('âŒ MongoDB connection error:', err)
    throw err
  }
}

