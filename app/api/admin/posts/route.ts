import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const sort = searchParams.get('sort') || ''
    const skip = (page - 1) * limit

    const whereClause = {
      title: {
        contains: search,
        mode: Prisma.QueryMode.insensitive,
      },
    }

    const [data, total] = await Promise.all([
      prisma.post.findMany({
        where: whereClause,
        orderBy:
          sort === 'featured'
            ? [{ isFeatured: 'desc' }, { createdAt: 'desc' }]
            : { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          _count: {
            select: { postVideos: true },
          },
        },
      }),
      prisma.post.count({ where: whereClause }),
    ])

    return NextResponse.json({ data, total })
  } catch (error) {
    console.error('[POST_LIST_ERROR]', error)
    return NextResponse.json(
      { message: 'Gagal mengambil data post' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      title,
      slug,
      deskripsi,
      release,
      imagePoster,
      imageBanner,
      rating,
      source,
      genres,
      studios,
      userId,
    } = body

    if (
      !title || !slug || !deskripsi || !release ||
      !imagePoster || !imageBanner || !source ||
      !Array.isArray(genres) || !Array.isArray(studios) || !userId
    ) {
      return NextResponse.json({ message: 'Semua field wajib diisi.' }, { status: 400 })
          }

      const existing = await prisma.post.findUnique({ where: { slug } })

      if (existing) {
        return NextResponse.json(
          { message: 'Judul sudah digunakan, coba judul lain.' },
          { status: 400 }
        )
      }
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        deskripsi,
        release,
        imagePoster,
        imageBanner,
        rating,
        source,
        userId,
        genres: {
          create: genres.map((genreId: string) => ({
            genre: { connect: { id: genreId } },
          })),
        },
        studios: {
          create: studios.map((studioId: string) => ({
            studio: { connect: { id: studioId } },
          })),
        },
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('[POST_CREATE_ERROR]', error)
    return NextResponse.json({ message: 'Gagal membuat post' }, { status: 500 })
  }
}
