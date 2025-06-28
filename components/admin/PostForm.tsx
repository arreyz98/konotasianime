'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MultiSelect from "@/components/ui/MultiSelect";
// import { Loader2 } from "lucide-react"
import { useState } from "react";
// import { useActionState } from "react"
// import { signUpCredentials } from "@/lib/actions";

const PostForm = () => {
    const genre = [
  { value: "action", label: "Action" },
  { value: "comedy", label: "Comedy" },
  { value: "drama", label: "Drama" },
  { value: "fantasy", label: "Fantasy" },
  { value: "horror", label: "Horror" },
  { value: "isekai", label: "Isekai" },
  { value: "kids", label: "Kids" },
  { value: "mystery", label: "Mystery" },
  { value: "romance", label: "Romance" },
  { value: "school", label: "School" },
  { value: "shounen", label: "Shounen" },
  { value: "superpower", label: "Superpower" },
  { value: "scifi", label: "Sci-fi" },
  { value: "thriller", label: "Thriller" },
];

    const studio = [
  { value: "a1-pictures", label : "A1-Pictures" },
   { value: "bones", label: "Bones" },
   { value: "gainax", label: "GAINAX" },
  { value: "j.c.staff", label: "J.C.Staff" },
  { value: "madhouse", label: "MADHOUSE" },
  { value: "kyoto_animations", label: "Kyoto Animations" },
  { value: "pierrot", label: "Pierrot" },
  { value: "productions_i.g", label: "Productions I.G" },
  { value: "shaft", label: "SHAFT" },
  { value: "studio_deen", label: "Studio DEEN" },
  { value: "studio_ghibli", label: "Studio Ghibli" },
  { value: "sunrise", label: "Sunrise" },
  { value: "toe_animations", label: "Toei Animations" },
];
      const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
      const [selectedStudios, setSelectedStudios] = useState<string[]>([]);

      const [selectedUrl,setSelectedUrl] = useState<string>("")

      const handleChangeUrl = (event :  React.ChangeEvent<HTMLInputElement>) => {
        setSelectedUrl(event.target.value.substring(17))
      }



    return(
        <div>
             <form action="" className="w-full sm:w-1/2 flex flex-col mt-5 mx-auto space-y-4 text-white body-font relative ">
        
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
                        onChange={handleChangeUrl}
                        placeholder="Masukkan Url"
                        className="min-h-14 w-full border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate- rounded-l-none"
                    />              
                    </div>
                <p className="text-[#25388C] text-sm">Pastika yang di copy paste yang seperti ini <span className="font-bold">https://youtu.be/zoilfomR_5U</span></p>
                </div>
                

                {/* Input Title */}
                <div>
                    <Label htmlFor="title" className="text-[#25388C] text-lg font-bold">Title</Label>
                    <Input name="title" id="title" className="min-h-14 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate-500" placeholder="Masukkan title" />
                </div>

                {/* Input Deskripsi */}
                <div>
                    <Label htmlFor="description" className="text-[#25388C] text-lg font-bold">Description</Label>
                    <Textarea name="description" id="description" className="min-h-14 h-20 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate-500" placeholder="Masukkan Deskripsi"  />
                </div>

                {/* Input Episode */}
                <div>
                    <Label htmlFor="episode" className="text-[#25388C] text-lg font-bold">Episode</Label>
                     <Input name="episode" id="episode" type="number" maxLength={2} className="min-h-14 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate-500" placeholder="0" />
                </div>

                {/* Input duration */}
                <div>
                    <Label htmlFor="duration" className="text-[#25388C] text-lg font-bold">Duration</Label>
                     <Input name="duration" id="duration" type="number" maxLength={2} className="min-h-14 border border-gray-400 bg-[#F9FAFB] p-4 text-base text-[#25388C] font-semibold placeholder:font-normal placeholder:text-slate-500" placeholder="0" />
                </div>

                {/* Input Genre */}
                <div className="w-full">
                <Label className="text-[#25388C] text-lg font-bold">Genre</Label>
                <MultiSelect
                        options={genre}
                        selectedValues={selectedCategories}
                        setSelectedValues={setSelectedCategories}
                        placeholder="Pilih Genre"
                    />
                </div>

                {/* Input Studio */}
                <div className="w-full">
                <Label className="text-[#25388C] text-lg font-bold">Studio</Label>
                <MultiSelect
                        options={studio}
                        selectedValues={selectedStudios}
                        setSelectedValues={setSelectedStudios}
                        placeholder="Pilih Studio"
                    />
                </div>

                 <Button type="submit" className="bg-[#25388C] text-dark-100 hover:bg-[#3854d0] inline-flex min-h-14 w-full items-center justify-center rounded-md px-6 py-2 font-extrabold text-base cursor-pointer mt-5 mb-72" >
                Buat Post
                 </Button>


            </form>
        </div>
    )
}

export default PostForm