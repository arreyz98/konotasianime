import StudioForm from '@/components/admin/StudioForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'


export default async function EditStudioPage({ params }: {params : Promise<{id : string}>}) {
  const id = (await params).id
  const studio = await prisma.studio.findUnique({
    where: { id: id },
  })

  if (!studio) return notFound()

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Edit Studio</h1>
      <StudioForm initialValues={studio} isEdit />
    </div>
  )
}
