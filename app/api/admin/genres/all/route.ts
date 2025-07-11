import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const genres = await prisma.genre.findMany({
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(genres)
  } catch (error) {
    console.error('[GENRES_GET_ALL_ERROR]', error)
    return NextResponse.json({ message: 'Gagal mengambil genre' }, { status: 500 })
  }
}
