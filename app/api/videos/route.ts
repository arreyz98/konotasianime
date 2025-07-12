import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '9')
    const skip = (page - 1) * limit

    const [videos, total] = await Promise.all([
      prisma.postVideo.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          post: {
            select: {
              slug: true,
              title: true,
              imageBanner: true,
            },
          },
        },
      }),
      prisma.postVideo.count(),
    ])

    return NextResponse.json({ data: videos, total })
  } catch (error) {
    console.error('[VIDEOS_GET_ERROR]', error)
    return NextResponse.json(
      { message: 'Gagal mengambil data video' },
      { status: 500 }
    )
  }
}
