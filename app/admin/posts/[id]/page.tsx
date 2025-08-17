import { PostForm } from '@/components/admin/PostForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {

  const id = (await params).id
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const post = await prisma.post.findUnique({
    where: { id: id },
    include: {
      genres: { select: { genreId: true } },
      studios: { select: { studioId: true } },
    },
  })

  if (!post) redirect('/admin/posts')

  return (
    <div className="p-6 w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-4">Edit Post</h1>
      <PostForm
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          deskripsi: post.deskripsi ?? '',
          release: post.release ?? '',
          imagePoster: post.imagePoster,
          imageBanner: post.imageBanner,
          rating: post.rating,
          source: post.source,
          genres: post.genres.map(g => ({ id: g.genreId })),
          studios: post.studios.map(s => ({ id: s.studioId })),
        }}
        userId={session.user.id}
      />
    </div>
  )
}
