import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  
  try {
    const id = (await params).id
    const body = await req.json()
    const {
      title,
      slug,
      deskripsi,
      release,
      imagePoster,
      imageBanner,
      rating,
      source,
      genres,
      studios,
      userId,
    } = body

    if (
      !title || !slug || !deskripsi || !release || !imagePoster || !imageBanner ||
      !source || !Array.isArray(genres) || !Array.isArray(studios) || !userId
    ) {
      return NextResponse.json({ message: 'Semua field wajib diisi.' }, { status: 400 })
    }

    // 1. Update data post utama
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        deskripsi,
        release,
        imagePoster,
        imageBanner,
        rating,
        source,
        userId,
      },
    })

    // 2. Hapus semua relasi genre & studio lama dari pivot
    await prisma.postGenre.deleteMany({ where: { postId: id } })
    await prisma.postStudio.deleteMany({ where: { postId: id } })

    // 3. Tambahkan ulang relasi genre baru
    if (genres.length > 0) {
      await prisma.postGenre.createMany({
        data: genres.map((genreId: string) => ({
          postId: id,
          genreId,
        })),
        skipDuplicates: true,
      })
    }

    // 4. Tambahkan ulang relasi studio baru
    if (studios.length > 0) {
      await prisma.postStudio.createMany({
        data: studios.map((studioId: string) => ({
          postId: id,
          studioId,
        })),
        skipDuplicates: true,
      })
    }

    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    console.error('[POST_UPDATE_ERROR]', error)
    return NextResponse.json({ message: 'Gagal update post' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const postId = (await params).id
    await prisma.post.delete({
      where: { id: postId },
    })

    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('[POST_DELETE_ERROR]', error)
    return NextResponse.json({ message: 'Gagal menghapus post' }, { status: 500 })
  }
}