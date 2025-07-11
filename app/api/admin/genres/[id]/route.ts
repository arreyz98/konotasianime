import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: {params : Promise<{id : string}>}) {
const id = (await params).id
  try {
    const genre = await prisma.genre.findUnique({
      where: { id: id },
    })

    if (!genre) {
      return NextResponse.json({ message: 'Genre tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json(genre)
  } catch (error) {
    console.error('[GENRE_GET_ID_ERROR]', error)
    return NextResponse.json({ message: 'Gagal mengambil genre' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: {params : Promise<{id : string}>}) {
  const id = (await params).id
  try {
    const { name } = await req.json()

    if (!name) {
      return NextResponse.json({ message: 'Nama genre wajib diisi' }, { status: 400 })
    }

    const genre = await prisma.genre.update({
      where: { id: id },
      data: { name },
    })

    return NextResponse.json(genre)
  } catch (error) {
    console.error('[GENRE_PUT_ERROR]', error)
    return NextResponse.json({ message: 'Gagal mengupdate genre' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: {params : Promise<{id : string}> }) {
  const id = (await params).id
  try {
    await prisma.genre.delete({
      where: { id: id },
    })

    return NextResponse.json({ message: 'Genre berhasil dihapus' })
  } catch (error) {
    console.error('[GENRE_DELETE_ERROR]', error)
    return NextResponse.json({ message: 'Gagal menghapus genre' }, { status: 500 })
  }
}
