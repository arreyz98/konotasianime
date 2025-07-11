import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const studios = await prisma.studio.findMany({
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(studios)
  } catch (error) {
    console.error('[STUDIOS_GET_ALL_ERROR]', error)
    return NextResponse.json({ message: 'Gagal mengambil studio' }, { status: 500 })
  }
}
