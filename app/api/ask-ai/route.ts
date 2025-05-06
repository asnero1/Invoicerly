// ✅ FILE: app/api/ask-ai/route.ts - Handles AI assistant queries via GPT

import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json()

    // Load local tasks.json
    const tasksPath = path.join(process.cwd(), 'data', 'tasks.json')
    const tasks = fs.existsSync(tasksPath)
      ? JSON.parse(fs.readFileSync(tasksPath, 'utf-8'))
      : []

    // System behavior prompt
    const systemPrompt = `You are a helpful assistant for a task logging app called Invoicerly. Based on the provided tasks, help the user summarize, prioritize, suggest follow-ups, or identify billable opportunities.`

    // Run OpenAI completion
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Here are the tasks:
${JSON.stringify(tasks, null, 2)}

User prompt: ${prompt}`,
        },
      ],
    })

    const reply = completion.choices[0].message.content
    return NextResponse.json({ reply })
  } catch (err) {
    console.error('❌ Error in AI assistant:', err)
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    )
  }
}

