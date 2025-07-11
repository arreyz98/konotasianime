import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const id  = (await params).id
  const { title, deskripsi, linkVideo, duration, episode } = await req.json()

  const updated = await prisma.postVideo.update({
    where: { id: id },
    data: { title, deskripsi, linkVideo, duration, episode },
  })

  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  await prisma.postVideo.delete({ where: { id: id } })
  return NextResponse.json({ message: 'Video dihapus' })
}
