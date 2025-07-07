import UpdatePostForm from "@/components/admin/UpdatePostForm";
import { getPostById } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

const Page = async ({params} : {params : Promise<{id : string}> }) => {
    const id = (await params).id ;
    const dataUpdatePost = await getPostById(id);

    if(!dataUpdatePost){
        notFound()
    }
    return (
        <div>
        <Button className="w-fit border border-[#F8F8FF] bg-[#25388C] text-base font-medium text-white hover:text-black hover:bg-[#F8F8FF]" asChild>
           <Link href={"/admin/posts"}><ChevronLeft />Back</Link>
        </Button>
           <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-[#25388C]">Update Postingan</h1>
          </div>
        <section className="w-full">
               <UpdatePostForm dataUpdatePost={dataUpdatePost}/>
        </section>

        </div>
    )
}

export default Page ;