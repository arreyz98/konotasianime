"use client"

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { PostOfficialChannelForm } from '@/components/admin/PostOfficialChannelForm'

export default function EditPostOfficialChannelPage() {
  const { postId } = useParams() as { postId: string }
  const router = useRouter()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/admin/post-official-channels/${postId}`)
        if (!res.ok) {
          router.replace('/not-found')
          return
        }
        const json = await res.json()
        setData(Array.isArray(json) ? json : [])
      } catch (error) {
        console.error('Failed to fetch data', error)
      } finally {
        setLoading(false)
      }
    }

    if (postId) {
      fetchData()
    }
  }, [postId, router])

  if (loading) {
    return <div className="text-white text-center mt-10">Memuat data...</div>
  }

  if (!data || data.length === 0) {
    return <div className="text-white text-center mt-10">Data tidak ditemukan</div>
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-white mb-6">Edit Channel Resmi</h1>
      <PostOfficialChannelForm isEdit postId={postId} initialData={data} />
    </div>
  )
}
