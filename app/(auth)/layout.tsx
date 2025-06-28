import { ReactNode } from "react";

import { Fingerprint } from "lucide-react";
import Image from "next/image";

const AuthLayout = ( { children } : {children : ReactNode}) => {
    return (
       <main className="relative flex flex-col-reverse text-light-100 sm:flex-row ">
           <section className="my-auto flex h-full min-h-screen flex-1 items-center bg-pattern bg-cover bg-top bg-[#16191E] px-5 py-10">
                <div className="bg-[#232839] gradient-vertical mx-auto flex max-w-xl flex-col gap-6 rounded-lg p-10">
                    <div className="flex flex-row gap-3 ">
                        <Fingerprint color="white" size={32} />
                        <h1 className="text-2xl font-semibold text-white">Autentikasi Admin</h1>
                    </div>
                    <div>{children}</div>
                      <p className="text-center text-sm font-medium text-[#D6E0FF] mt-3">
                            Jika tidak bisa login tanyakan di <span className="font-bold text-[#E7C9A5]">Discord</span>
                        </p>
                </div>
           </section>
           <section className="sticky h-40 w-full sm:top-0 sm:h-screen sm:flex-1">
                <Image src="/images/auth-wallpaper.jpg" alt="test" height="1000" width="1000" className="size-full object-cover" />
           </section>
        </main>
    )
}

export default AuthLayout;