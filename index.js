import InvoiceDashboard from './components/InvoiceDashboard'

export default function Home() {
  return (
    <div>
      <h1>Welcome to Invoicerly</h1>
      <InvoiceDashboard />
    </div>
  )
}
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Invoicerly API is Running Successfully! 🎉')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
