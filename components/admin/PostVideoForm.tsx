"use client";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "../ui/badge";
import { Loader2 } from "lucide-react"
import { useState , useActionState } from "react";
import { createVideoPost } from "@/lib/actions";

const PostVideoForm = ({id} : {id : string}) => {
    const createVideoPostWithId = createVideoPost.bind(null,id);
    const [state , formAction , isLoading] = useActionState(createVideoPostWithId,null)
      const [selectedUrl,setSelectedUrl] = useState<string>("")
      const handleChangeUrl = (event :  React.ChangeEvent<HTMLInputElement>) => {
        setSelectedUrl(event.target.value.substring(17))
        
      }

    return(
        <div>
            <form action={formAction} className="w-full sm:w-1/2 flex flex-col mt-5 mx-auto space-y-4 text-white body-font relative ">
                <div className="flex flex-wrap w-full mb-10 flex-col items-center text-center">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-[#25388C]">Buat Video Baru</h1>
                </div>

        {selectedUrl != '' && (
              <div className="relative h-full overflow-hidden mb-10">
                <iframe className="h-96 w-full" src={`https://www.youtube.com/embed/${selectedUrl}`} allowFullScreen />
            </div>
        )}


         {/* <div className="relative h-full overflow-hidden mb-10">
                <iframe className="h-96 w-full" src={`https://www.youtube.com/embed/8pNUtqdmAw8&pp=ygUEbXVzZQ%3D%3D`} allowFullScreen />
            </div>
           */}

                {/* Input Url */}
                <div>
                    <div className="w-full flex items-center">
                    <Button type="button" className="h-14 rounded-r-none shadow bg-[#25388C] cursor-pointer">https://youtu.be/</Button>
                    <input
                        type="text"
                        value={selectedUrl}
                        name="linkVideo"
                        onChange={handleChangeUrl}
                        placeholder="Masukkan Url"
                        className="min-h-14 w-full border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate- rounded-l-none"
                    />              
                    </div>
                <p className="text-[#25388C] text-sm">Pastikan yang di copy paste yang seperti ini <span className="font-bold">https://youtu.be/zoilfomR_5U</span></p>
                </div>
                

                {/* Input Title */}
                <div>
                    <Label htmlFor="title" className="text-[#25388C] text-lg font-bold">Title</Label>
                    <Input name="title" id="title" className="min-h-14 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate-500" value={state?.dataVideoPost?.title} placeholder="Masukkan title" />
                </div>

                {/* Input Deskripsi */}
                <div>
                    <Label htmlFor="description" className="text-[#25388C] text-lg font-bold">Description</Label>
                    <Textarea name="deskripsi" id="description" className="min-h-14 h-20 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate-500" placeholder="Masukkan Deskripsi"  />
                </div>

                {/* Input Episode */}
                <div>
                    <Label htmlFor="episode" className="text-[#25388C] text-lg font-bold">Episode</Label>
                     <Input name="episode" id="episode" type="number" maxLength={4} className="min-h-14 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate-500" />
                </div>

                {/* Input duration */}
                <div>
                    <Label htmlFor="duration" className="text-[#25388C] text-lg font-bold">Duration</Label>
                     <Input name="duration" id="duration" type="text" className="min-h-14 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate-500" placeholder="0" />
                     <p className="text-[#25388C] text-sm mt-3">Contoh inputan jika durasi video berdurasi 30 menit, maka masukan<span className="font-bold ml-1">30 Min</span></p>
                </div>

                   {isLoading ? (
                                   <Button type="submit" className="bg-[#25388C] text-dark-100 hover:bg-[#3854d0] inline-flex min-h-14 w-full items-center justify-center rounded-md px-6 py-2 font-extrabold text-base cursor-pointer mt-5 mb-72" disabled><Loader2 className="animate-spin" />
                                   Sedang diproses ...
                                  </Button>
                                   ) : (
                                    <Button type="submit" className="bg-[#25388C] text-dark-100 hover:bg-[#3854d0] inline-flex min-h-14 w-full items-center justify-center rounded-md px-6 py-2 font-extrabold text-base cursor-pointer mt-5 mb-72" >
                                    Tambah Video
                                   </Button>
                                   )}

            </form>
        </div>
    )
}

export default PostVideoForm;