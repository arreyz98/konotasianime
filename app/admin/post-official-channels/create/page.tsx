import { PostOfficialChannelForm } from '@/components/admin/PostOfficialChannelForm'

export default function CreatePostOfficialChannelPage({
  searchParams,
}: {
  searchParams: { postId: string }
}) {
  if (!searchParams.postId) {
    return <p className="text-white">postId tidak ditemukan di URL.</p>
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-white mb-6">Tambah Channel Resmi untuk Post</h1>
      <PostOfficialChannelForm postId={searchParams.postId} />
    </div>
  )
}
