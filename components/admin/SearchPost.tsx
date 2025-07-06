"use client"

import { usePathname, useSearchParams,useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";


const SearchPost = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((term : string) => {   
       const params = new URLSearchParams(searchParams);
       params.set("page","1");
       if(term){
        params.set("query",term)
       }
       else{
        params.delete("query")
       }
       replace(`${pathname}?${params.toString()}`)
    },300)

    return(
       <div className="w-full flex items-center">
                    <Button type="button" className="h-12 w-14 rounded-r-none shadow bg-[#25388C] cursor-pointer">
                        <Search className="size-6"/>
                    </Button>
                    <Input
                        type="text"
                        placeholder="Search Title"
                        onChange={(e) => handleSearch(e.target.value)}
                        defaultValue={searchParams.get("query")?.toString()}
                        className="min-h-12 w-1/4 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate- rounded-l-none"
                    />              
    </div>          

    )
}

export default SearchPost;