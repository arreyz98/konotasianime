import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT /api/admin/post-video/:videoId
export async function PUT(
  req: NextRequest,
  { params }: { params: { videoId: string } }
) {
  const { videoId } = params

  if (!videoId) {
    return NextResponse.json({ error: 'ID video tidak ditemukan.' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const { title, deskripsi, linkVideo, duration, episode } = body

    if (
      !title || !deskripsi || !linkVideo || !duration || !episode ||
      typeof title !== 'string' ||
      typeof deskripsi !== 'string' ||
      typeof linkVideo !== 'string' ||
      typeof duration !== 'string' ||
      typeof episode !== 'number'
    ) {
      return NextResponse.json({ error: 'Data tidak valid.' }, { status: 400 })
    }

    const updated = await prisma.postVideo.update({
      where: { id: videoId },
      data: {
        title,
        deskripsi,
        linkVideo, // hanya ID YouTube
        duration,
        episode,
      },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating post video:', error)
    return NextResponse.json({ error: 'Gagal memperbarui video.' }, { status: 500 })
  }
}

// DELETE /api/admin/post-video/:videoId
export async function DELETE(
  req: NextRequest,
  { params }: { params: { videoId: string } }
) {
  const { videoId } = params

  if (!videoId) {
    return NextResponse.json({ error: 'ID video tidak ditemukan.' }, { status: 400 })
  }

  try {
    await prisma.postVideo.delete({
      where: { id: videoId },
    })

    return NextResponse.json({ message: 'Video berhasil dihapus.' })
  } catch (error) {
    console.error('Error deleting video:', error)
    return NextResponse.json({ error: 'Gagal menghapus video.' }, { status: 500 })
  }
}

