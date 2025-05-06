import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: NextRequest) {
  const { prompt } = await req.json()

  if (!prompt) {
    return NextResponse.json({ reply: 'No prompt provided.' }, { status: 400 })
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant embedded in an invoicing app.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    })

    const reply = completion.choices[0]?.message?.content || 'No reply.'
    return NextResponse.json({ reply })
  } catch (err: any) {
    console.error('❌ GPT Error:', err)
    return NextResponse.json(
      { error: 'GPT API error occurred.' },
      { status: 500 }
    )
  }
}

