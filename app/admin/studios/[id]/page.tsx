import StudioForm from '@/components/admin/StudioForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}

export default async function EditStudioPage({ params }: Props) {
  const studio = await prisma.studio.findUnique({
    where: { id: params.id },
  })

  if (!studio) return notFound()

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Edit Studio</h1>
      <StudioForm initialValues={studio} isEdit />
    </div>
  )
}
