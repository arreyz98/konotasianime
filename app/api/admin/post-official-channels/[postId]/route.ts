import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

type Params = { params: { id: string } }

export async function GET(
  _: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const data = await prisma.postOfficialChannel.findMany({
      where: { postId: params.postId },
      select: {
        id: true,
        url: true,
        isPaid: true,
        officialChannelId: true,
      },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('[GET_POST_OFFICIAL_CHANNEL_ERROR]', error)
    return NextResponse.json({ message: 'Gagal mengambil data' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const body = await req.json()
    const { url, isPaid, postId, officialChannelId } = body

    const updated = await prisma.postOfficialChannel.update({
      where: { id: params.id },
      data: {
        url,
        isPaid,
        postId,
        officialChannelId,
      },
    })

    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ message: 'Gagal mengupdate data' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await prisma.postOfficialChannel.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Berhasil dihapus' })
  } catch {
    return NextResponse.json({ message: 'Gagal menghapus data' }, { status: 500 })
  }
}
