export const runtime = 'nodejs' // ✅ Required for Prisma

import { NextRequest, NextResponse } from 'next/server'

// ✅ Move import inside each function to avoid top-level evaluation
const getPrisma = async () => {
  const { default: prisma } = await import('@/lib/prisma')
  return prisma
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId')
    if (!userId)
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })

    const prisma = await getPrisma()
    const payYouItems = await prisma.payYou.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(payYouItems, { status: 200 })
  } catch (error) {
    console.error('[PAYYOU_GET_ERROR]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, title, amount, dueDate, description } = await req.json()
    if (!userId || !title || !amount || !dueDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const prisma = await getPrisma()
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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, amount, dueDate, description } = await req.json()
    if (!id || !title || !amount || !dueDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const prisma = await getPrisma()
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
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    if (!id)
      return NextResponse.json({ error: 'PayYou ID required' }, { status: 400 })

    const prisma = await getPrisma()
    await prisma.payYou.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('[PAYYOU_DELETE_ERROR]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
