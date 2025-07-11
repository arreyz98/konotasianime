'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { postSchema, PostSchema } from '@/lib/validators/postSchema'


export async function updatePostAction(id: string, data: PostSchema): Promise<void> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error('Unauthorized')

  const validated = postSchema.parse(data)

  await prisma.post.update({
    where: { id },
    data: {
      title: validated.title,
      deskripsi: validated.deskripsi,
      release: validated.release,
      imagePoster: validated.imagePoster,
      imageBanner: validated.imageBanner || '',
      source: validated.source.filter(Boolean),
      genres: {
        deleteMany: {},
        create: validated.genreIds.map((genreId) => ({ genreId })),
      },
      studios: {
        deleteMany: {},
        create: validated.studioIds.map((studioId) => ({ studioId })),
      },
    },
  })

}
