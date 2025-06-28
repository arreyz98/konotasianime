import FormLogin from "@/components/auth/FormLogin";

const Page = () => {
    return(
        <>
        <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold text-white">
          Login Admin
        </h1>
        <p className="text-[#D6E0FF]">
         Masukkan email dan password
        </p>
        </div>
        <FormLogin />
        </>
    )
}

export default Page;