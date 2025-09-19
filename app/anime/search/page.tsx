import AnimeGrid from '@/components/AnimeGrid'

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>
}) {
  const resolved = searchParams ? await searchParams : {}
  const query = resolved.q ?? ''

  return (
    <section className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-6 bg-[#1C2029]">
      <AnimeGrid initialQuery={query} />
    </section>
  )
}
