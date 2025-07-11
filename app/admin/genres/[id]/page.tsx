import { GenreForm } from '@/components/admin/GenreForm'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

type Props = {
  params: {
    id: string
  }
}

export default async function EditGenrePage({ params }: Props) {
  const genre = await prisma.genre.findUnique({
    where: { id: params.id },
  })

  if (!genre) return notFound()

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">Edit Genre</h1>
    <GenreForm initialValues={genre} isEdit />
    </div>
  )
}
