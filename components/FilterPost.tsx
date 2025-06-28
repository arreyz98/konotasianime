"use client"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

import { SetStateAction, useState } from "react"
const FilterPost = () => {
  const [isOpenSelectGenre, setIsOpenSelectGenre] = useState(false);
  const [isOpenSortBy, setIsOpenSortBy] = useState(false);

    const [selectedSortBy, setSelectedSortBy] = useState('Sort By');
    const [selectedGenre, setSelectedGenre] = useState('Genres');

    const sortBy = ['Name A-Z','Name Z-A','Latest Update']

    const genres = ['DSA Self Placed', 'JavaScript',
                       'Python', 'Java', 'C++', 'Ruby',
                       'Go', 'TypeScript'];


  const toggleDropdownSelectGenre = () => {
        setIsOpenSelectGenre(!isOpenSelectGenre);
    };

  const toggleDropdownSortBy = () => {
        setIsOpenSortBy(!isOpenSortBy);
    };

    const handleSelectSortBy = (sortBy: SetStateAction<string>) => {
        setSelectedSortBy(sortBy);
        setIsOpenSortBy(false);
    };

    const handleSelectGenre = (genre: SetStateAction<string>) => {
        setSelectedGenre(genre);
        setIsOpenSelectGenre(false);
    };

    return(
        <div className="flex flex-row space-x-3">
        {/* Sort By  */}
         <div className="relative">
            <Button className="bg-black cursor-pointer h-[50px] w-[200px] font-bold text-base text-slate-400 hover:bg-[#1C2029]" onClick={toggleDropdownSortBy}>
            {selectedSortBy}<ChevronDown className="size-5 ml-auto" />
            </Button>
            {isOpenSortBy && (
                <div className="absolute top-14 z-10 bg-black w-56 rounded-lg"> 
                <div className="py-1">
                      {sortBy.map((sortBy, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block px-4 py-2
                                               text-sm text-white
                                               hover:bg-[#1C2029]"
                                    onClick={() => handleSelectSortBy(sortBy)}
                                >
                                    {sortBy}
                                </a>
                            ))}
                </div>
            </div>
            )}
         </div>

        {/* Pilih Genre  */}
         <div className="relative">
            <Button className="bg-black cursor-pointer h-[50px] w-[200px] font-bold text-base text-slate-400 hover:bg-[#1C2029]" onClick={toggleDropdownSelectGenre}>
            {selectedGenre}<ChevronDown className="size-5 ml-auto" />
            </Button>
            {isOpenSelectGenre && (
                <div className="absolute top-14 z-10 bg-black w-56 rounded-lg"> 
                <div className="py-1">
                      {genres.map((genre, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block px-4 py-2
                                               text-sm text-white
                                               hover:bg-[#1C2029]"
                                    onClick={() => handleSelectGenre(genre)}
                                >
                                    {genre}
                                </a>
                            ))}
                </div>
            </div>
            )}
         </div>

    </div>
    )
}

export default FilterPost ;