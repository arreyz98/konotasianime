'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { postSchema, PostSchema } from '@/lib/validators/postSchema'
import slugify from 'slugify'

export async function createPostAction(data: PostSchema): Promise<void> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) throw new Error('Unauthorized')

  const validated = postSchema.parse(data)

  const baseSlug = slugify(validated.title, { lower: true, strict: true })
  let slug = baseSlug
  let counter = 1
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter++}`
  }

  await prisma.post.create({
    data: {
      title: validated.title,
      slug,
      deskripsi: validated.deskripsi,
      release: validated.release,
      imagePoster: validated.imagePoster,
      imageBanner: validated.imageBanner || '',
      source: validated.source.filter(Boolean),
      userId: session.user.id,
      genres: {
        create: validated.genreIds.map((genreId) => ({ genreId })),
      },
      studios: {
        create: validated.studioIds.map((studioId) => ({ studioId })),
      },
    },
  })

}
