import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { title, deskripsi, linkVideo, duration, episode } = await req.json()

  const updated = await prisma.postVideo.update({
    where: { id: params.id },
    data: { title, deskripsi, linkVideo, duration, episode },
  })

  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.postVideo.delete({ where: { id: params.id } })
  return NextResponse.json({ message: 'Video dihapus' })
}
