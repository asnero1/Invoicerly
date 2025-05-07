import { writeFile, mkdir, readFile, writeFile as writeJSON } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.formData()
    const file = data.get('file') as File
    const nameRaw = data.get('user')
    const captionRaw = data.get('caption')

    const userName = nameRaw?.toString().trim() || ''
    const caption = captionRaw?.toString().trim() || ''

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!userName) {
      return NextResponse.json({ error: 'Missing user name' }, { status: 400 })
    }

    if (!caption) {
      return NextResponse.json({ error: 'Missing caption' }, { status: 400 })
    }

    const mimeType = file.type
    console.log('âº MIME TYPE:', mimeType)

    const ext = path.extname(file.name) || '.mp4' // fallback to mp4
    const safeName = userName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/gi, '')
    const fileName = `@${Date.now()}${safeName ? `-${safeName}` : ''}${ext}`

    const buffer = Buffer.from(await file.arrayBuffer())
    const sprukeDir = path.join(process.cwd(), 'public', 'sprukes')
    await mkdir(sprukeDir, { recursive: true })

    const uploadPath = path.join(sprukeDir, fileName)
    await writeFile(uploadPath, buffer)
    console.log('âœ… File saved at:', uploadPath)

    const sprukesPath = path.join(process.cwd(), 'data', 'sprukes.json')
    let sprukes = []

    try {
      const existing = await readFile(sprukesPath, 'utf-8')
      sprukes = JSON.parse(existing)
    } catch {
      console.warn('âš ï¸ No existing sprukes.json. Creating fresh.')
    }

    const newSpruke = {
      fileName,
      userName,
      caption,
      timestamp: new Date().toISOString(),
      likes: 0,
      userId: null,
      avatar: null,
    }

    sprukes.push(newSpruke)

    await writeJSON(sprukesPath, JSON.stringify(sprukes, null, 2), 'utf-8')
    console.log('âœ… New spruke written to sprukes.json:', newSpruke)

    return NextResponse.json({ success: true, fileName })
  } catch (error) {
    console.error('ï¿½"ï¿½ Fatal error in POST /post-spruke:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

