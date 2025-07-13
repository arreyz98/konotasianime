import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }


  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium">Total Postingan</h3>
          <p className="text-3xl font-bold mt-2">123</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium">Total User</h3>
          <p className="text-3xl font-bold mt-2">45</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-medium">Post Hari Ini</h3>
          <p className="text-3xl font-bold mt-2">8</p>
        </div>
      </div>
    </div>
  )
}
