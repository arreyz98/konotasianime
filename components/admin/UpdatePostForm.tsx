'use client';
import React from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MultiSelect from "@/components/ui/MultiSelect";
import { Badge } from "../ui/badge";
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react";
import { useActionState } from "react"
import { updatePost } from "@/lib/actions";
import { useSession } from "next-auth/react"
import type { Post } from "@prisma/client";

const UpdatePostForm = ({dataUpdatePost} : {dataUpdatePost : Post}) => {
const { data: session  } = useSession()

const updatePostWithId = updatePost.bind(null,dataUpdatePost.id);
const [state , formAction , isLoading] = useActionState(updatePostWithId,null)
  const [genres, setGenres] = useState();
  const [studios, setStudios] = useState();

useEffect(() => {
    async function fetchData() {
      try {
        const responseGenres = await fetch('/api/genres');
        const dataGenres = await responseGenres.json();
        setGenres(dataGenres.data);
        const responseStudios = await fetch('/api/studios')
        const dataStudios = await responseStudios.json();
        setStudios(dataStudios.data);
        setSelectedCategories(dataUpdatePost.genre)
        setSelectedStudios(dataUpdatePost.studio)
        
      } catch (error) {
        console.error("Error fetching data SERVER ACTION INGRESOS:", error);
      }
    }
    fetchData();
  }, [dataUpdatePost.genre, dataUpdatePost.studio])
  
      const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
      const [selectedStudios, setSelectedStudios] = useState<string[]>([]);

    return(
        <div>
             <form action={formAction} className="w-full sm:w-1/2 flex flex-col mt-5 mx-auto space-y-4 text-white body-font relative ">

                {/* Id from session */}
              <input className="hidden" type="text" name="userId" readOnly value={session ? session.user.id : "0"} />

                {/* Input Title */}
                <div>
                    <Label htmlFor="title" className="text-[#25388C] text-lg font-bold">Title</Label>
                    <Input name="title" id="title" className="min-h-14 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate-500" defaultValue={state ? state?.dataPost?.title : dataUpdatePost.title} placeholder="Masukkan title" />
                    {state?.error &&(
                      <Badge className="bg-red-500 mt-2 text-base">{state?.error?.title}</Badge>
                    )}
                  
         
                </div>

                {/* Input Deskripsi */}
                <div>
                    <Label htmlFor="deskripsi" className="text-[#25388C] text-lg font-bold">Description</Label>
                    <Textarea name="deskripsi" id="description" className="min-h-14 h-20 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate-500" defaultValue={state ? state?.dataPost?.deskripsi : dataUpdatePost.deskripsi}  placeholder="Masukkan Deskripsi"  />
                    {state?.error && (
                      <Badge className="bg-red-500 mt-2 text-base">{state?.error?.deskripsi}</Badge>
                    )}
                </div>

                {/* Input Rating */}
                <div>
                    <Label htmlFor="rating" className="text-[#25388C] text-lg font-bold">Rating</Label>
                     <Input name="rating" id="rating" type="text" className="min-h-14 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate-500" defaultValue={state ? state?.dataPost?.rating : dataUpdatePost.rating}  placeholder="Masukkan Rating"/>
                     <Badge className="bg-[#25388C] mt-2 text-base mr-4">Contoh : PG 13</Badge>
                     {state?.error && (
                       <Badge className="bg-red-500 mt-2 text-base">{state?.error?.rating}</Badge>
                     )}
                </div>

                {/* Input Release */}
                <div>
                    <Label htmlFor="release" className="text-[#25388C] text-lg font-bold">Tahun Release</Label>
                     <Input name="release" id="release" type="text" className="min-h-14 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate-500" defaultValue={state ? state?.dataPost?.release : dataUpdatePost.release}  placeholder="Masukkan Tahun Release" />
                     {state?.error && (
                      <Badge className="bg-red-500 mt-2 text-base">{state?.error?.release}</Badge>
                     )}
                </div>

                {/* Input Genre */}
                <div className="w-full">
                <Label className="text-[#25388C] text-lg font-bold">Genre</Label>
                {genres && (
                <MultiSelect
                        options={genres}
                        selectedValues={selectedCategories}
                        setSelectedValues={setSelectedCategories}
                        placeholder="Pilih Genre"
                    />
                )}
                {/* <input className="hidden" name="genre" readOnly value={selectedCategories} /> */}
                  {selectedCategories.map((option, idx) => (
                      <input
                        key={idx}
                        type="hidden"
                        name="genre"
                        value={option}
                      />
                    ))}
                </div>

                {/* Input Studio */}
                <div className="w-full">
                <Label className="text-[#25388C] text-lg font-bold">Studio</Label>

                {studios && (
                      <MultiSelect
                        options={studios}
                        selectedValues={selectedStudios}
                        setSelectedValues={setSelectedStudios}
                        placeholder="Pilih Studio"
                    />
                )}
                  {selectedStudios.map((option, idx) => (
                      <input
                        key={idx}
                        type="hidden"
                        name="studio"
                        value={option}
                      />
                    ))}
                </div>

                {/* Input Link Gambar Poster */}
                <div>
                    <Label htmlFor="imagePoster" className="text-[#25388C] text-lg font-bold">Gambar Poster</Label>
                     <Input name="imagePoster" id="imagePoster" type="text" className="min-h-14 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate-500" defaultValue={state ? state?.dataPost?.imagePoster : dataUpdatePost.imagePoster}  placeholder="Masukkan Link" />
                     {state?.error && (
                       <Badge className="bg-red-500 mt-2 text-base">{state?.error?.imagePoster}</Badge>
                     )}
                </div>

                {/* Input Link Gambar Banner */}
                <div>
                    <Label htmlFor="imageBanner" className="text-[#25388C] text-lg font-bold">Gambar Banner</Label>
                     <Input name="imageBanner" id="imageBanner" type="text" className="min-h-14 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate-500" defaultValue={state ? state?.dataPost?.imageBanner : dataUpdatePost.imageBanner}  placeholder="Masukkan Link" />
                     {state?.error && (
                       <Badge className="bg-red-500 mt-2 text-base">{state?.error?.imageBanner}</Badge>
                     )}
                </div>

                {/* Input Link Source */}
               <div className="flex flex-col space-y-3">
                <Label htmlFor="" className="text-[#25388C] text-lg font-bold">Sources</Label>
                    <div className="w-full flex items-center">
                      <Button type="button" className="h-14 rounded-r-none shadow bg-[#25388C]">Anilist</Button>
                      <input type="text" name="source1" defaultValue={state ? state?.dataPost?.source1 : dataUpdatePost.source[0]}  placeholder="Masukkan Url" className="min-h-14 w-full border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate- rounded-l-none rounded-r-lg"/>              
                    </div>
                    {state?.error && (
                    <Badge className="bg-red-500 text-base">{state?.error?.source1}</Badge>
                    )}
                    <div className="w-full flex items-center">
                      <Button type="button" className="h-14 rounded-r-none shadow bg-[#25388C] cursor-pointer">AniDB</Button>
                      <input type="text" name="source2" defaultValue={state ? state?.dataPost?.source2 : dataUpdatePost.source[1]} placeholder="Masukkan Url" className="min-h-14 w-full border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate- rounded-l-none rounded-r-lg"/>              
                    </div>
                    {state?.error && (
                      <Badge className="bg-red-500 text-base">{state?.error?.source2}</Badge>
                    )}
                    <div className="w-full flex items-center">
                      <Button type="button" className="h-14 rounded-r-none shadow bg-[#25388C] cursor-pointer">MyAnimeList</Button>
                      <input type="text" name="source3" defaultValue={state ? state?.dataPost?.source3 : dataUpdatePost.source[2]} placeholder="Masukkan Url" className="min-h-14 w-full border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate- rounded-l-none rounded-r-lg"/>              
                    </div>
                    {state?.error && (
                      <Badge className="bg-red-500 text-base">{state?.error?.source3}</Badge>
                    )}
                </div>
                  {isLoading ? (
                  <Button type="submit" className="bg-[#25388C] text-dark-100 hover:bg-[#3854d0] inline-flex min-h-14 w-full items-center justify-center rounded-md px-6 py-2 font-extrabold text-base cursor-pointer mt-5 mb-72" disabled><Loader2 className="animate-spin" />
                  Sedang diproses ...
                 </Button>
                  ) : (
                   <Button type="submit" className="bg-[#25388C] text-dark-100 hover:bg-[#3854d0] inline-flex min-h-14 w-full items-center justify-center rounded-md px-6 py-2 font-extrabold text-base cursor-pointer mt-5 mb-72" >
                    Update Post
                  </Button>
                  )}
                  


            </form>
        </div>
    )
}

export default UpdatePostForm;