
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PostTable from "@/components/admin/PostTable";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Page = () => {
    return(
        <section className="w-full rounded-2xl border border-gray-400 p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-bold text-[#25388C]">List Postingan</h2>
                <Button className="bg-[#25388C] font-bold" asChild>
                    <Link href={"/admin/posts/new"}>
                    + Buat Post Baru
                    </Link>
                </Button>
            </div>

            <div className="mt-7 w-full overflow-hidden space-y-4">
                <div className="w-full flex items-center">
                    <Button type="button" className="h-12 w-14 rounded-r-none shadow bg-[#25388C] cursor-pointer">
                        <Search className="size-6"/>
                    </Button>
                    <Input
                        type="text"
                        placeholder="Search Title"
                        className="min-h-12 w-1/4 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate- rounded-l-none"
                    />              
                    </div>
                <PostTable />
            </div>
        </section>
    )
}

export default Page;