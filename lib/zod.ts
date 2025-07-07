import {array, object , string , number } from "zod";

export const LoginSchema = object({
    email : string().email("Invalid Email"),
    password : string().min(5, "Password tidak boleh kosong")
})

export const RegisterSchema = object({
    email : string().email("Invalid Email"),
    name : string().min(5, "Username tidak boleh kosong"),
    password : string().min(5, "Password tidak boleh kosong")
})

export const PostSchema = object({
    title : string().min(1,"Title tidak boleh kosong"),
    deskripsi : string().min(10,"Deskripsi tidak boleh kosong"),
    rating : string().min(1,"Rating tidak boleh kosong"),
    release : string().min(4,"Tahun rilis tidak boleh kosong"),
    genre : array(string()),
    studio : array(string()),
    imagePoster : string().min(10,"Link gambar poster tidak boleh kosong"),
    imageBanner : string().min(10,"Link gambar banner tidak boleh kosong"),
    source1 : string().min(10,"Source Anilist tidak boleh kosong"),
    source2 : string().min(10,"Source AniDB tidak boleh kosong"),
    source3 : string().min(10,"Source MyAnimelist tidak boleh kosong"),
    userId : string()
})

export const PostVideoSchema = object({
    title : string().min(1,"Title tidak boleh kosong"),
    deskripsi : string().min(10,"Deskripsi tidak boleh kosong"),
    linkVideo : string().min(10,"Link video tidak boleh kosong"),
    duration : string().min(1,"Durasi tidak boleh kosong"),
    episode : number().min(1,"Episode tidak boleh kosong"),
    postId : string()
})

export const UpdatePostVideoSchema = object({
    title : string().min(1,"Title tidak boleh kosong"),
    deskripsi : string().min(10,"Deskripsi tidak boleh kosong"),
    linkVideo : string().min(10,"Link video tidak boleh kosong"),
    duration : string().min(1,"Durasi tidak boleh kosong"),
    episode : number().min(1,"Episode tidak boleh kosong"),
})
