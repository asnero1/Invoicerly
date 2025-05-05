// File: app/api/process-payment/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Process payment logic here
    return NextResponse.json({
      success: true,
      message: 'Payment processed successfully.',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process payment.' },
      { status: 500 }
    )
  }
}
