import { prisma } from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [genres, total] = await Promise.all([
      prisma.genre.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        orderBy: { name: 'asc' },
        skip,
        take: limit,
      }),
      prisma.genre.count({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }),
    ])

    return NextResponse.json({ data: genres, total })
  } catch (error) {
    console.error('[GENRES_GET_ERROR]', error)
    return NextResponse.json({ message: 'Gagal mengambil data genre' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { names } = await req.json()

    if (!Array.isArray(names) || names.length === 0) {
      return NextResponse.json({ message: 'Minimal 1 genre harus diisi' }, { status: 400 })
    }

    const createdGenres = await Promise.all(
      names.map(async (name: string) => {
        // Validasi duplikat nama genre
        const existing = await prisma.genre.findFirst({ where: { name } })
        if (existing) return null

        return prisma.genre.create({ data: { name } })
      })
    )

    const filtered = createdGenres.filter(Boolean) // Buang null (duplikat)

    return NextResponse.json({ message: 'Berhasil tambah genre', data: filtered })
  } catch (error) {
    console.error('[POST_GENRE_ERROR]', error)
    return NextResponse.json({ message: 'Gagal membuat genre' }, { status: 500 })
  }
}

