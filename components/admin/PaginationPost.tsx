"use client";
import Link from "next/link";
import { usePathname,useSearchParams } from "next/navigation";
import clsx from "clsx";
import { generatePagination } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationPost = ({totalPages} : {totalPages : number}) =>{
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1

    const createPageUrl = (pageNumber : string | number) =>{
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`
    }

    const allPages = generatePagination(currentPage,totalPages);

    const PaginationNumber = ({
        page,
        href,
        position,
        isActive
    }:{
        page : number | string;
        href : string;
        position? : "first" | "last" | "middle" | "single";
        isActive : boolean;
    }) => {
        const className= clsx("flex h-10 w-10 items-center justify-center text-sm border",
            {
                "rounded-l-sm" : position === "first" || position === "single",
                "rounded-r-sm" : position === "last" || position === "single",
                "z-10 text-[#25388C]" : isActive,
                "bg-[#25388C] text-white" : !isActive,
                "hover:bg-gray-100 " : isActive && position !== "middle",
                "text-white bg-[#25388C] pointer-events-none" : position === "middle"
            });
            return isActive && position == "middle" ? (
                <div className={className}>{page}</div>
            ):(
                <Link href={href} className={className}>
                    {page}
                </Link>
            );
    }
    
    const PaginationArrow = ({
        href,
        direction,
        isDisabled
    }:{
        href : string;
        direction : "left"  | "right";
        isDisabled : boolean ;
    }) => {
        const className= clsx("flex h-10 w-10 items-center justify-center text-sm border",
            {
                "pointer-events-none text-gray-700" : isDisabled,
                "text-white bg-[#25388C]" : !isDisabled,
                "mr-2" : direction === "left",
                "ml-2" : direction === "right"
            }
        );

        const icon = direction === "left" ? (
            <ChevronLeft className="size-5"/>
        ) : (
            <ChevronRight className="size-5"/>
        );

        return isDisabled ? (
            <div className={className}>{icon}</div>
        ) : (
            <Link href={href} className={className}>{icon}</Link>
        );
    }

    return (
        <div className="inline-flex">
            <PaginationArrow direction="left" href={createPageUrl(currentPage - 1)} isDisabled={currentPage <= 1}/>
        <div className="flex -space-x-px">
            {allPages.map((page , index) => {
                let position : "first" | "last" | "single" | "middle" | undefined;
                if(index === 0) position = "first";
                if(index === allPages.length - 1) position = "last";
                if(allPages.length === 1) position = "single";
                if(page === "...") position = "middle";
                return(
                    <PaginationNumber key={index} href={createPageUrl(page)} page={page} position={position} isActive={currentPage == page}/>
                )
            })}
        </div>
            <PaginationArrow direction="right" href={createPageUrl(currentPage + 1)} isDisabled={currentPage >= totalPages}/>
        </div>
    )
}
export default PaginationPost