'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deletePostAction(postId: string) {
  await prisma.post.delete({ where: { id: postId } })

  // Revalidate cache & redirect dengan query param
  revalidatePath('/admin/posts')
  redirect('/admin/posts?deleted=1')
}
