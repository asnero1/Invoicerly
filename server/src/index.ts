import express from 'express';
import connectDB from './db'; // ✅ Keep this path correct
import invoiceRoutes from './routes/invoiceRoutes'; // ✅ Corrected

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/invoices', invoiceRoutes); // ✅ Now your API route is registered

app.listen(3000, () => console.log('🚀 Server running on port 3000'));
