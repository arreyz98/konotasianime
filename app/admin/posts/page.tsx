
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import { Suspense } from "react";
import Link from "next/link";
import PostTable from "@/components/admin/PostTable";
import SearchPost from "@/components/admin/SearchPost";
import { getPostPages } from "@/lib/data";
import PaginationPost from "@/components/admin/PaginationPost";

const Page = async ({searchParams} : {searchParams? : Promise<{query? : string; page? : string}> }) => {
    const query = (await searchParams)?.query || "";
    const currentPage = Number((await searchParams)?.page) || 1;

    const totalPages = await getPostPages(query)

    return(
        <section className="w-full rounded-2xl border border-gray-400 p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-bold text-[#25388C]">List Postingan</h2>
                <Button className="bg-[#25388C] font-bold" asChild>
                    <Link href={"/admin/posts/create"}>
                    + Buat Post Baru
                    </Link>
                </Button>
            </div>

            <div className="mt-7 w-full overflow-hidden space-y-4">
               <SearchPost/>
               <Suspense key={query + currentPage} fallback={<Loading/>}>
                <PostTable query={query} currentPage={currentPage}/>
               </Suspense>
                <div className="flex justify-center mt-4">
                    {totalPages && (
                        <PaginationPost totalPages={totalPages}/>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Page;