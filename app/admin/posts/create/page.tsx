import { PostForm } from '@/components/admin/PostForm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function CreatePostPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen p-6 bg-zinc-950 text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#4C6E49]">Tambah Postingan Baru</h1>
          <p className="text-zinc-400 text-sm">Lengkapi data postingan anime di bawah ini.</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <PostForm userId={session.user.id} />
        </div>
      </div>
    </div>
  )
}
