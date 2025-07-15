import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id
  try {
    const { isFeatured } = await req.json()

    const updated = await prisma.post.update({
      where: { id: id },
      data: { isFeatured },
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Gagal update" }, { status: 500 })
  }
}