import { NextResponse } from 'next/server';
import { readdir, readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const sprukeDir = path.join(process.cwd(), 'public', 'sprukes');
    const metadataPath = path.join(process.cwd(), 'public', 'data', 'sprukes.json');

    const files = await readdir(sprukeDir);
    const metadata = JSON.parse(await readFile(metadataPath, 'utf-8'));

    const sprukes = files
      .filter((f) => f.endsWith('.mp4') || f.endsWith('.wav'))
      .map((fileName) => {
        const meta = metadata.find((m: any) => m.fileName === fileName);
        return {
          fileName,
          name: meta?.name || '',
          caption: meta?.caption || '',
        };
      });

    return NextResponse.json(sprukes);
  } catch (error) {
    console.error('Error reading sprukes:', error);
    return NextResponse.json({ error: 'Failed to load sprukes' }, { status: 500 });
  }
}
