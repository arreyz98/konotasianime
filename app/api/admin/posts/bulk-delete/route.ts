// app/api/admin/posts/bulk-delete/route.ts

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request) {
  try {
    const { ids } = await req.json()

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: 'ID tidak valid' }, { status: 400 })
    }

    await prisma.post.deleteMany({
      where: { id: { in: ids } },
    })

    return NextResponse.json({ message: 'Berhasil menghapus post' })
  } catch (error) {
    console.error('[BULK_DELETE_POST_ERROR]', error)
    return NextResponse.json({ message: 'Gagal menghapus post' }, { status: 500 })
  }
}
