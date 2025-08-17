import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await prisma.postOfficialChannel.findMany({
      include: {
        post: { select: { title: true } },
        officialChannel: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ message: 'Gagal mengambil data' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { postId, entries } = await req.json()

    if (!postId || !Array.isArray(entries) || entries.length === 0) {
      return NextResponse.json({ message: 'Data tidak lengkap' }, { status: 400 })
    }

    // Hapus semua official channel lama dari post ini
    await prisma.postOfficialChannel.deleteMany({
      where: { postId },
    })

    // Simpan official channel baru
    const created = await prisma.postOfficialChannel.createMany({
      data: entries.map((entry: { url: string; isPaid: boolean; officialChannelId: string }) => ({
        url: entry.url,
        isPaid: entry.isPaid,
        officialChannelId: entry.officialChannelId,
        postId,
      }))
    })

    return NextResponse.json({ message: 'Berhasil menyimpan channel resmi', count: created.count })
  } catch (error) {
    console.error('[POST_OFFICIAL_CHANNEL_BULK_CREATE_ERROR]', error)
    return NextResponse.json({ message: 'Terjadi kesalahan saat menyimpan' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const { postId, channels } = await req.json()

    if (!postId || !Array.isArray(channels)) {
      return NextResponse.json({ message: 'Data tidak valid' }, { status: 400 })
    }

    // Hapus semua data lama
    await prisma.postOfficialChannel.deleteMany({
      where: { postId },
    })

    // Insert ulang semua data baru
    await prisma.postOfficialChannel.createMany({
        data: channels.map((entry: { url: string; isPaid: boolean; officialChannelId: string }) => ({
        url: entry.url,
        isPaid: entry.isPaid,
        officialChannelId: entry.officialChannelId,
        postId,
      }))
    })

    return NextResponse.json({ message: 'Berhasil diperbarui' })
  } catch (error) {
    console.error('[POST_OFFICIAL_CHANNEL_PUT_ERROR]', error)
    return NextResponse.json({ message: 'Gagal menyimpan data' }, { status: 500 })
  }
}
