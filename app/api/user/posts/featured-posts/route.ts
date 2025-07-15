import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const featuredPosts = await prisma.post.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        deskripsi: true,
        imageBanner: true,
      },
    })

    return NextResponse.json(featuredPosts)
  } catch (error) {
    console.error('[FEATURED_POSTS_ERROR]', error)
    return NextResponse.json({ message: 'Gagal mengambil featured posts' }, { status: 500 })
  }
}
