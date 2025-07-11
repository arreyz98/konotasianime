import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [data, total] = await Promise.all([
      prisma.studio.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        orderBy: { name: 'asc' },
        skip,
        take: limit,
      }),
      prisma.studio.count({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      }),
    ])

    return NextResponse.json({ data, total })
  } catch (error) {
    console.error('[GET_STUDIO_ERROR]', error)
    return NextResponse.json(
      { message: 'Gagal mengambil data studio' },
      { status: 500 }
    )
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Jika `studios` adalah array (multi add)
    if (Array.isArray(body.studios)) {
      const created = await prisma.$transaction(
        body.studios.map((name: string) =>
          prisma.studio.create({
            data: { name },
          })
        )
      )
      return NextResponse.json(created, { status: 201 })
    }

    // Single add
    const { name } = body
    if (!name) {
      return NextResponse.json({ message: 'Nama studio wajib diisi.' }, { status: 400 })
    }

    const existing = await prisma.studio.findFirst({ where: { name } })
    if (existing) {
      return NextResponse.json({ message: 'Nama studio sudah ada.' }, { status: 400 })
    }

    const created = await prisma.studio.create({ data: { name } })
    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('[STUDIO_CREATE_ERROR]', error)
    return NextResponse.json({ message: 'Gagal menambahkan studio' }, { status: 500 })
  }
}


export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    const { ids } = body // array of studio IDs

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: 'ID studio tidak valid.' }, { status: 400 })
    }

    await prisma.studio.deleteMany({
      where: {
        id: { in: ids },
      },
    })

    return NextResponse.json({ message: 'Studio berhasil dihapus.' })
  } catch (error) {
    console.error('[STUDIO_BULK_DELETE_ERROR]', error)
    return NextResponse.json({ message: 'Gagal menghapus studio.' }, { status: 500 })
  }
}
