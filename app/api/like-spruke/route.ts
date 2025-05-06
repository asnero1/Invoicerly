import { NextResponse } from 'next/server'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  try {
    const { fileName } = await req.json()
    if (!fileName) {
      return NextResponse.json({ error: 'Missing fileName' }, { status: 400 })
    }

    const sprukesPath = path.join(process.cwd(), 'data', 'sprukes.json')
    const raw = await readFile(sprukesPath, 'utf-8')
    const sprukes = JSON.parse(raw)

    const index = sprukes.findIndex((s: any) => s.fileName === fileName)
    if (index === -1) {
      return NextResponse.json({ error: 'Spruke not found' }, { status: 404 })
    }

    sprukes[index].likes += 1

    await writeFile(sprukesPath, JSON.stringify(sprukes, null, 2), 'utf-8')

    return NextResponse.json({ success: true, likes: sprukes[index].likes })
  } catch (err) {
    console.error('ðŸ'¥ Error liking spruke:', err)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

