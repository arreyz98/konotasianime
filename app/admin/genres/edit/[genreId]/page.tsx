import { notFound } from 'next/navigation'
import { GenreForm } from '@/components/admin/GenreForm'
import { prisma } from '@/lib/prisma'


export default async function EditGenrePage({ params }: {params : {genreId : string}}) {
  
  const genreId = (await params).genreId
  const genre = await prisma.genre.findUnique({
    where: { id: genreId },
  })

  if (!genre) return notFound()

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-white">Edit Genre</h1>
      <GenreForm initialValues={genre} isEdit />
    </div>
  )
}
