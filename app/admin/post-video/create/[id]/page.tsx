import PostVideoForm from "@/components/admin/PostVideoForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const CreatePostVideoPage = async ({params} : {params : {id : string}}) => {
    const id = params.id
    return (
        <>
        <Button className="w-fit border border-[#F8F8FF] bg-[#25388C] text-base font-medium text-white hover:text-black hover:bg-[#F8F8FF]" asChild>
           <Link href={"/admin/posts"}><ChevronLeft />Back</Link> 
        </Button>

        <section className="w-full">
                <PostVideoForm id={id} />
        </section>

        </>
    )
}

export default CreatePostVideoPage ;