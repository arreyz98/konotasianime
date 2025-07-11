import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { ids } = await req.json()

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 })
    }

    await prisma.postVideo.deleteMany({
      where: { id: { in: ids } },
    })

    return NextResponse.json({ message: 'Berhasil dihapus' })
  } catch (error) {
    console.error('Bulk delete error:', error)
    return NextResponse.json({ error: 'Terjadi kesalahan' }, { status: 500 })
  }
}
