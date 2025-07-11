import StudioForm from "@/components/admin/StudioForm"

export default function CreateStudioPage() {
  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Tambah Studio</h1>
      </div>

      <StudioForm />
    </div>
  )
}
