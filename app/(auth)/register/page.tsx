import FormRegister from "@/components/auth/FormRegister";

const Page = () => {
    return(
        <>
        <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold text-white">
          Buat Akun Baru
        </h1>
        <p className="text-[#D6E0FF]">
         Masukkan semua tidak boleh ada yang kosong
        </p>
        </div>
        <FormRegister />
        </>
    )
}

export default Page;