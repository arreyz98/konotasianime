import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const options = [
  "Most relevance",
  "Added date",
  "Name A-Z",
  "Name Z-A",
]

export function SortOrderDropdown({
  sortOrder,
  onChange
}: {
  sortOrder: string
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-[200px] h-[48px] flex justify-between items-center px-4 text-white bg-[#09090B] rounded-xl shadow-sm">
          <span>{sortOrder || "Sort by"}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="bg-[#1C2029] text-white rounded-xl mt-2 w-[200px] p-2 space-y-1">
        {options.map(option => (
          <button
            key={option}
            onClick={() => {
              onChange(option)
              setOpen(false)
            }}
            className={`w-full flex items-center px-3 py-2 rounded-md text-left text-sm hover:bg-[#2A2A2A] ${
              sortOrder === option ? 'bg-[#dc5b41] font-semibold' : ''
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full mr-3 mt-[2px] ${
                sortOrder === option ? 'bg-white' : 'border border-white'
              }`}
            />
            {option}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
