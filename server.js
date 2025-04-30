const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.send('✅ Invoicerly API is Running Successfully! 🎉');
});

// New API route for fetching sample data
app.get('/api/data', (req, res) => {
  const sampleData = [
    { id: 1, name: 'Invoice 001', amount: '$100', status: 'Paid' },
    { id: 2, name: 'Invoice 002', amount: '$250', status: 'Pending' },
    { id: 3, name: 'Invoice 003', amount: '$400', status: 'Overdue' },
  ];
  res.json(sampleData);
});

// Define a PORT for the server
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
