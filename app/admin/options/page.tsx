import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
const Options = () => {
    return (
        <section className="w-full rounded-2xl border border-gray-400 p-7">
            <form action={async () => {
                "use server"
                await signOut( { redirectTo : "/login"})
                }}
            >
                <Button type="submit" className="bg-red-500 cursor-pointer hover:bg-[#25388C] ">Log Out</Button>
           </form>
        </section>
    )
}
export default Options;