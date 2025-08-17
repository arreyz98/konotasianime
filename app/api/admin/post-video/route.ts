import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const postId = searchParams.get('postId')
  const search = searchParams.get('search') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const skip = (page - 1) * limit

  if (!postId) {
    return NextResponse.json({ message: 'postId diperlukan' }, { status: 400 })
  }

  try {
   const [data, total, post] = await Promise.all([
    prisma.postVideo.findMany({
      where: {
        postId,
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
      orderBy: { episode: 'asc' },
      skip,
      take: limit,
    }),
    prisma.postVideo.count({
      where: {
        postId,
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    }),
    prisma.post.findUnique({
      where: { id: postId },
      select: { title: true },
    }),
  ])

  return NextResponse.json({
    data,
    total,
    postTitle: post?.title ?? '',
  })
} catch (error) {
  console.error(error)
  return NextResponse.json({ message: 'Gagal mengambil data video' }, { status: 500 })
  }

}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      title,
      deskripsi,
      linkVideo,
      duration,
      episode,
      type,
      postId,
      officialLinks = [], // Tambahkan ini
    } = body

      if (!title || !deskripsi || !duration || !episode || !type || !postId) {
      return NextResponse.json({ message: 'Semua field wajib diisi.' }, { status: 400 });
    }

   const video = await prisma.postVideo.create({
      data: {
        title,
        deskripsi,
        linkVideo,
        duration,
        episode,
        type,
        postId,
        officialLinks: {
        create: officialLinks.map((link: { platformId: string; url: string; access?: string }) => ({
          platformId: link.platformId,
          url: link.url,
          access: link.access ?? 'Gratis',
        })),
        },
      },
      include: {
        officialLinks: true,
      },
    });
    
     return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('[POST_VIDEO_CREATE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}


