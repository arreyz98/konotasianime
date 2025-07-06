import PostForm from "@/components/admin/PostForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const Page = async () => {
    return (
        <>
        <Button className="w-fit border border-[#F8F8FF] bg-[#25388C] text-base font-medium text-white hover:text-black hover:bg-[#F8F8FF]" asChild>
           <Link href={"/admin/posts"}><ChevronLeft />Back</Link> 
        </Button>

        <section className="w-full">
                <PostForm />
        </section>

        </>
    )
}

export default Page ;