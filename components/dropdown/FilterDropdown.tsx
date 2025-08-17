// components/CustomDropdown.tsx
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

const FilterDropdown: React.FC<CustomDropdownProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const selectOption = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[200px]">
      {/* Tombol utama */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex justify-between items-center bg-[#09090B] font-space-mono text-white text-sm pl-4 pr-10 py-2 h-[48px] rounded-xl shadow-sm focus:outline-none transition duration-200 ease-in-out hover:bg-[#4C6E49] w-full"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">
          {options.find((opt) => opt.value === value)?.label || label}
        </span>
        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Daftar opsi */}
      {isOpen && (
        <ul
          className="absolute z-20 mt-1 w-full bg-[#09090B] border border-gray-700 rounded-xl shadow-lg overflow-hidden overflow-y-auto max-h-60 scroll-smooth focus:outline-none"
          role="listbox"
          aria-labelledby={label}
        >
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => selectOption(opt.value)}
                className={`block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#111111] transition-colors duration-150 ${
                  value === opt.value ? "font-bold bg-[#1a1a1a]" : ""
                }`}
                role="option"
                aria-selected={value === opt.value}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Overlay untuk close saat klik di luar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default FilterDropdown;