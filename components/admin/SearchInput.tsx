'use client'

import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChangeAction: (e: React.ChangeEvent<HTMLInputElement>) => void // Ubah nama prop
  placeholder: string
}

export function SearchInput({ 
  value, 
  onChangeAction, // Gunakan nama baru
  placeholder 
}: SearchInputProps) {
  return (
    <div className="relative w-full md:w-64">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChangeAction}
        className="pl-10 bg-zinc-800 border-zinc-700 text-white"
      />
    </div>
  )
}