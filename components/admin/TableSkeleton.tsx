// components/admin/PostTableSkeleton.tsx

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {[...Array(rows)].map((_, i) => (
        <tr key={i} className="border-t border-zinc-800">
          <td className="px-4 py-3">
            <div className="h-4 bg-zinc-700 rounded w-3/4 animate-pulse" />
          </td>
          <td className="px-4 py-3 text-center">
            <div className="h-4 bg-zinc-700 rounded w-1/2 mx-auto animate-pulse" />
          </td>
          <td className="px-4 py-3 text-center">
            <div className="h-4 bg-zinc-700 rounded w-2/3 mx-auto animate-pulse" />
          </td>
          <td className="px-4 py-3">
            <div className="flex space-x-3 justify-center">
              <div className="h-8 w-14 bg-zinc-700 rounded animate-pulse" />
              <div className="h-8 w-14 bg-zinc-700 rounded animate-pulse" />
            </div>
          </td>
        </tr>
      ))}
    </>
  )
}
