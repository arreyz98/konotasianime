import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request) {
  try {
    const { ids } = await req.json()

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: 'Tidak ada ID yang dikirim' }, { status: 400 })
    }

    await prisma.genre.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })

    return NextResponse.json({ message: 'Genre berhasil dihapus' })
  } catch (error) {
    console.error('[GENRE_BULK_DELETE_ERROR]', error)
    return NextResponse.json({ message: 'Terjadi kesalahan saat menghapus' }, { status: 500 })
  }
}
