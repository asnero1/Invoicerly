import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const sprukesPath = path.join(process.cwd(), 'data', 'sprukes.json')
    const file = await readFile(sprukesPath, 'utf-8')
    const sprukes = JSON.parse(file)

    // Return sorted (newest first)
    return NextResponse.json(
      sprukes.sort(
        (a: any, b: any) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
    )
  } catch (err) {
    console.error('❌ Error reading sprukes.json:', err)
    return NextResponse.json([], { status: 200 })
  }
}
