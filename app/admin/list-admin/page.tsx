
import AdminTable from "@/components/admin/AdminTable";

const Page = () => {
    return (
        <div>
             <section className="w-full rounded-2xl border border-gray-400 p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-bold text-[#25388C]">List Admin</h2>
            </div>

            <div className="mt-7 w-full overflow-hidden space-y-4">
            <AdminTable />
            </div>
        </section>
        </div>
    )
}

export default Page;