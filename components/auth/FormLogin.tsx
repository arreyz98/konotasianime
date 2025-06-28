"use client";

import { useActionState } from "react";
import { signInCredentials } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react"

const FormLogin = () => {
      const [state , formAction , isLoading] = useActionState(signInCredentials,null)
    return (
        <form action={formAction} className="w-full sm:w-sm space-y-2">
          {state?.message && (
            <div className="bg-rose-400 p-4 my-4 rounded-lg text-white text-center font-bold">{state.message}</div>
          )}
            <Label htmlFor="email" className="text-white text-lg mt-5">Email</Label>
            <Input id="email" type="text" name="email" defaultValue={state?.dataLogin?.email} className="w-full min-h-14 border-none text-base font-bold placeholder:font-normal text-white placeholder:text-light-100 focus-visible:ring-0 focus-visible:shadow-none bg-slate-700" />
            <p className="text-red-400">{state?.error?.email}</p>

            <Label htmlFor="password" className="text-white text-lg mt-5">Password</Label>
            <Input id="password" type="password" name="password" defaultValue={state?.dataLogin?.password} className="w-full min-h-14 border-none text-base font-bold placeholder:font-normal text-white placeholder:text-light-100 focus-visible:ring-0 focus-visible:shadow-none bg-slate-700" />
            <p className="text-red-400">{state?.error?.password}</p>

            {isLoading ? (
            <Button className="bg-[#E7C9A5] text-dark-100 hover:bg-[#E7C9A5] inline-flex min-h-14 w-full items-center justify-center rounded-md px-6 py-2 font-extrabold text-base cursor-pointer mt-5" disabled>
                <Loader2 className="animate-spin" />
                Sedang diproses ...
            </Button>)
            :
            (
            <Button type="submit" className="bg-[#E7C9A5] text-dark-100 hover:bg-[#E7C9A5] inline-flex min-h-14 w-full items-center justify-center rounded-md px-6 py-2 font-extrabold text-base cursor-pointer mt-5" >
                Login
            </Button>
            )
            }
          

           

        </form>
    )
}

export default FormLogin;