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
    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err)
    throw err
  }
}
