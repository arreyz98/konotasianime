// app/api/videos/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const videos = await prisma.postVideo.findMany({
      include: {
        post: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    })

    return NextResponse.json(videos)
  } catch (error) {
    console.error('[VIDEOS_GET_ERROR]', error)
    return NextResponse.json({ message: 'Gagal mengambil data video' }, { status: 500 })
  }
}
