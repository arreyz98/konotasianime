import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const query = searchParams.get('q') ?? ''
  const genre = searchParams.get('genre') ?? ''
  const studio = searchParams.get('studio') ?? ''
  const sort = searchParams.get('sort') ?? 'desc'
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = 24
  const skip = (page - 1) * limit

  // Tentukan urutan sort
  const orderBy: Prisma.PostOrderByWithRelationInput = (() => {
    if (sort === 'az') return { title: 'asc' }
    if (sort === 'za') return { title: 'desc' }
    if (sort === 'asc') return { createdAt: 'asc' }
    return { createdAt: 'desc' } // default
  })()

  // Buat kondisi where secara bertahap
  const where: Prisma.PostWhereInput = {
    ...(query && {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
      ],
    }),
    ...(genre && {
      genres: {
        some: {
          genre: {
            name: { equals: genre, mode: 'insensitive' },
          },
        },
      },
    }),
    ...(studio && {
      studios: {
        some: {
          studio: {
            name: { equals: studio, mode: 'insensitive' },
          },
        },
      },
    }),
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        genres: { include: { genre: true } },
        studios: { include: { studio: true } },
        postVideos: true,
      },
    }),
    prisma.post.count({ where }),
  ])

  return NextResponse.json({
    posts,
    total,
    totalPages: Math.ceil(total / limit),
  })
}
