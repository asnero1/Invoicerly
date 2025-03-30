import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/invoicerly')
    console.log('✅ MongoDB Connected Successfully!')
  } catch (error) {
    console.error('❌ MongoDB Connection Failed!', error)
    process.exit(1)
  }
}

export default connectDB
