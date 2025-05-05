import { NextRequest, NextResponse } from 'next/server'

// Sample API to approve an invoice
export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    console.log('Approving invoice:', data)

    // Process the invoice approval logic here
    return NextResponse.json({ message: 'Invoice approved successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to approve invoice' },
      { status: 500 }
    )
  }
}
