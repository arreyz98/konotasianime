import AnimeGrid from '@/components/AnimeGrid'

export default function SearchPage({ searchParams }: { searchParams?: { q?: string } }) {
  const query = searchParams?.q ?? '' // masih bisa ada q, tapi optional

  return (
    <section className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-6 bg-[#1C2029]">
      <AnimeGrid initialQuery={query} />
    </section>
  )
}
