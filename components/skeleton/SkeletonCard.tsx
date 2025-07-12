export default function SkeletonCard() {
  return (
    <div className="w-full max-w-[480px] animate-pulse bg-[#0E1015] rounded-2xl shadow-lg">
      <div className="relative h-[260px] sm:h-[300px] bg-gray-800 rounded-t-2xl" />

      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-700 rounded w-full" />
        <div className="h-3 bg-gray-700 rounded w-5/6" />
        <div className="h-3 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  )
}
