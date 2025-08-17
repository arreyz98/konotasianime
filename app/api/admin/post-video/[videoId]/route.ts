import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: NextRequest, { params }: {params : Promise<{videoId : string}>}) {
  const videoId = (await params).videoId
  try {
    const video = await prisma.postVideo.findUnique({
      where: { id: videoId },
      include : {
        officialLinks : {
          select : {
            platformId : true,
            url : true,
            access : true
          }
        }
      }
    })

    if (!video) {
      return NextResponse.json({ message: 'Video tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json(video)
  } catch (error) {
    console.error('[POST_VIDEO_GET_ERROR]', error)
    return NextResponse.json({ message: 'Gagal mengambil video' }, { status: 500 })
  }
}


// PUT /api/admin/post-video/:videoId
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  const videoId = (await params).videoId

    try {
    const body = await req.json()
    const {
    title,
    deskripsi,
    linkVideo,
    duration,
    episode,
    type,
    officialLinks = [],
  } = body;

    
const updated = await prisma.postVideo.update({
  where: { id: videoId },
  data: {
    title,
    deskripsi,
    linkVideo,
    duration,
    episode,
    type,
    officialLinks: {
      deleteMany: {}, // Hapus semua dulu
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

    return NextResponse.json(updated)
  } catch (error) {
    console.error('[POST_VIDEO_UPDATE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: {params : Promise<{videoId : string}>}) {

  try {
    const videoId = (await params).videoId
    const deleted = await prisma.postVideo.delete({
      where: { id: videoId},
    })

    return NextResponse.json({ success: true, deleted })
  } catch (error) {
    console.error('[POST_VIDEO_DELETE]', error)
    return new NextResponse('Failed to delete video', { status: 500 })
  }
}
