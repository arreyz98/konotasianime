'use client'

import * as React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { Checkbox } from '@/components/ui/checkbox'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type Option = {
  label: string
  value: string
}

type MultiSelectProps = {
  options: Option[]
  value: string[]
  onChangeAction: (values: string[]) => void
  placeholder?: string
  label?: string
  error?: string
}

export function MultiSelect({
  options,
  value,
  onChangeAction,
  placeholder = 'Pilih opsi',
  label,
  error,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [buttonWidth, setButtonWidth] = React.useState<number>(0)
  const buttonRef = React.useRef<HTMLButtonElement | null>(null)

  // Set width hanya saat open true
  React.useEffect(() => {
    if (open && buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth)
    }
  }, [open])

  const toggleValue = (val: string) => {
    if (value.includes(val)) {
      onChangeAction(value.filter((v) => v !== val))
    } else {
      onChangeAction([...value, val])
    }
  }

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label)

  return (
    <div className="w-full relative">
      {label && (
        <label className="text-sm mb-1 block text-white" htmlFor={`multiselect-${label}`}>
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={`multiselect-${label}`}
            ref={buttonRef}
            variant="outline"
            className={cn(
              'w-full justify-between bg-zinc-800 text-white border-zinc-700 h-[50px]',
              !value.length && 'text-zinc-400'
            )}
          >
            {selectedLabels.length > 0 ? selectedLabels.join(', ') : placeholder}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={4}
          style={{ width: buttonWidth }}
          className="p-0 bg-zinc-900 border border-zinc-800 text-white animate-in fade-in zoom-in-95 max-h-60 overflow-y-auto rounded-md shadow-xl"
        >
          <Command className="bg-zinc-900 text-white">
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => toggleValue(option.value)}
                  className={cn(
                    'flex gap-2 items-center px-3 py-2 cursor-pointer text-white',
                    'hover:bg-zinc-800 hover:text-white',
                    'data-[value=true]:bg-zinc-800 data-[value=true]:text-white'
                  )}
                >
                  <Checkbox
                    checked={value.includes(option.value)}
                    onCheckedChange={() => toggleValue(option.value)}
                    className="border-zinc-700 data-[state=checked]:bg-green-600"
                  />
                  {option.label}
                  {value.includes(option.value) && (
                    <Check className="ml-auto h-4 w-4 text-green-500 transition-opacity duration-150" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
