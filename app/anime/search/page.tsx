


import { notFound } from 'next/navigation'
import AnimeGrid from '@/components/AnimeGrid'


export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = (await searchParams).q ?? ''
  if (!query) return notFound()

  return (
    <section className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-6 bg-[#1C2029]">
      
        <AnimeGrid initialQuery={query} />
    </section>
  )
}
