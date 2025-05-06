// ✅ FILE: app/api/suggest-reply/route.ts
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { subject } = await req.json()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are an assistant that generates short, helpful, and friendly reply suggestions for messages.',
        },
        {
          role: 'user',
          content: `Suggest 3 brief replies I might send for a message with subject: "${subject}"`,
        },
      ],
    })

    const rawText = completion.choices[0].message.content || ''
    const suggestions = rawText
      .split(/\n|•|�"|-/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 3)

    return NextResponse.json({ suggestions })
  } catch (err) {
    console.error('[suggest-reply]', err)
    return NextResponse.json({ suggestions: [] }, { status: 200 })
  }
}

