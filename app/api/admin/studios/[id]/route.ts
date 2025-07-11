import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function GET(_: Request, { params }: {params : Promise<{id : string}> }) {
  const id = (await params).id
  try {
    const studio = await prisma.studio.findUnique({
      where: { id: id },
    })
    if (!studio) return NextResponse.json({ message: 'Studio tidak ditemukan' }, { status: 404 })

    return NextResponse.json(studio)
  } catch (error) {
    console.error('[GET_STUDIO_ERROR]', error)
    return NextResponse.json({ message: 'Gagal mengambil data studio' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
const id = (await params).id
  try {
    const { name } = await req.json()

    if (!name) {
      return NextResponse.json({ message: 'Nama studio wajib diisi.' }, { status: 400 })
    }

    const existing = await prisma.studio.findFirst({
      where: {
        name,
        NOT: { id: id }, // ⛔ hindari konflik dengan data sendiri
      },
    })

    if (existing) {
      return NextResponse.json({ message: 'Nama studio sudah digunakan.' }, { status: 409 })
    }

    const studio = await prisma.studio.update({
      where: { id: id },
      data: { name },
    })

    return NextResponse.json(studio)
  } catch {
    return NextResponse.json({ message: 'Gagal mengupdate studio' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: {params : Promise<{id : string}>}) {
  const id = (await params).id
  try {
    await prisma.studio.delete({
      where: { id: id },
    })

    return NextResponse.json({ message: 'Studio berhasil dihapus' })
  } catch (error) {
    console.error('[DELETE_STUDIO_ERROR]', error)
    return NextResponse.json({ message: 'Gagal menghapus studio' }, { status: 500 })
  }
}
