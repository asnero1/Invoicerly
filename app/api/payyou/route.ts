import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Retrieve PayYou items
export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId')
    if (!userId)
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })

    const payYouItems = await prisma.payYou.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(payYouItems, { status: 200 })
  } catch (error) {
    console.error('[PAYYOU_GET_ERROR]', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// POST - Create new PayYou item
export async function POST(req: NextRequest) {
  try {
    const { userId, title, amount, dueDate, description } = await req.json()

    if (!userId || !title || !amount || !dueDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newPayYou = await prisma.payYou.create({
      data: {
        userId,
        title,
        amount,
        dueDate: new Date(dueDate),
        description,
      },
    })

    return NextResponse.json(newPayYou, { status: 201 })
  } catch (error) {
    console.error('[PAYYOU_POST_ERROR]', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// PUT - Update existing PayYou item
export async function PUT(req: NextRequest) {
  try {
    const { id, title, amount, dueDate, description } = await req.json()

    if (!id || !title || !amount || !dueDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const updatedPayYou = await prisma.payYou.update({
      where: { id },
      data: {
        title,
        amount,
        dueDate: new Date(dueDate),
        description,
      },
    })

    return NextResponse.json(updatedPayYou, { status: 200 })
  } catch (error) {
    console.error('[PAYYOU_PUT_ERROR]', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete PayYou item
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id)
      return NextResponse.json({ error: 'PayYou ID required' }, { status: 400 })

    await prisma.payYou.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: 'Deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[PAYYOU_DELETE_ERROR]', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

