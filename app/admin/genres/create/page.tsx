import { GenreForm } from '@/components/admin/GenreForm'

export default function CreateGenrePage() {
  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-white">Tambah Genre</h1>
      <GenreForm />
    </div>
  )
}
