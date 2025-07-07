import { getPostById } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { Suspense } from "react";
// import SearchPost from "@/components/admin/SearchPost";
import VideoTable from "@/components/admin/VideoTable";

const PostVideoPage = async ({params} : {params : Promise<{id : string}> }) => {
    const id = (await params).id
    const dataPost = await getPostById(id);
    return(
       <section className="w-full rounded-2xl border border-gray-400 p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-2xl font-bold text-[#25388C]">{`${dataPost?.title}`}</h2>
                <Button className="bg-[#25388C] font-bold" asChild>
                    <Link href={`/admin/post-video/create/${id}`}>
                    + Buat Video Baru
                    </Link>
                </Button>
            </div>

            <div className="mt-7 w-full overflow-hidden space-y-4">
               {/* <SearchPost/> */}
                   <VideoTable postId={id}/>
               {/* <Suspense key={query + currentPage} fallback={<Loading/>}>
                <PostTable query={query} currentPage={currentPage}/>
               </Suspense> */}
                {/* <div className="flex justify-center mt-4">
                    {totalPages && (
                        <PaginationPost totalPages={totalPages}/>
                    )}
                </div> */}
            </div>
        </section>
    )
}
export default PostVideoPage;