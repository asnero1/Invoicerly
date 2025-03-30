import express, { Request, Response } from 'express'
import Invoice from '../data/invoiceModel' // Ensure this path is correct

const router = express.Router() // ✅ Correct Express Router initialization

// ✅ CREATE: Add a new Invoice
router.post('/', async (req: Request, res: Response) => {
  try {
    const invoice = new Invoice(req.body)
    await invoice.save()
    res.status(201).json(invoice) // ✅ No need to return a Response type
  } catch (error) {
    res.status(400).json({ error: 'Failed to create invoice' })
  }
})

// ✅ READ: Get All Invoices
router.get('/', async (req: Request, res: Response) => {
  try {
    const invoices = await Invoice.find().exec() // ✅ `.exec()` ensures proper execution
    res.json(invoices)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoices' })
  }
})

// ✅ READ: Get One Invoice by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const invoice = await Invoice.findById(req.params.id).exec() // ✅ Use `.exec()`
    if (!invoice) {
      res.status(404).json({ error: 'Invoice not found' }) // ✅ Fixed TypeScript error
      return
    }
    res.json(invoice)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoice' })
  }
})

// ✅ UPDATE: Modify an Invoice by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec()
    if (!updatedInvoice) {
      res.status(404).json({ error: 'Invoice not found' }) // ✅ Fixed TypeScript error
      return
    }
    res.json(updatedInvoice)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update invoice' })
  }
})

// ✅ DELETE: Remove an Invoice by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id).exec() // ✅ Use `.exec()`
    if (!deletedInvoice) {
      res.status(404).json({ error: 'Invoice not found' }) // ✅ Fixed TypeScript error
      return
    }
    res.json({ message: 'Invoice deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete invoice' })
  }
})

export default router
