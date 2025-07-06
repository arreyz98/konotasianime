"use server";
import { RegisterSchema, LoginSchema , PostSchema, PostVideoSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { getPostVideoById } from "./data";
import { slugify } from "./utils";

export const signUpCredentials = async(prevState : unknown, formData : FormData) => {
  
    const dataRegister = {
        email : formData.get('email') as string,
        name : formData.get('name') as string,
        password : formData.get('password') as string
    }

    const validatedFields = RegisterSchema.safeParse(Object.fromEntries(formData.entries()));
    if(!validatedFields.success){
        return {
            dataRegister : dataRegister,
            error: validatedFields.error.flatten().fieldErrors
        }
    }
    const {email , name , password } = validatedFields.data
    const hashedPassword = hashSync(password, 10);
    try {
        await prisma.user.create({
            data : {
                name : name,
                email : email,
                password : hashedPassword
            }
        })
    } catch  {
        return { message : "Registrasi gagal, Akun sudah terdaftar",}
    }
    redirect("/login");
}

export const signInCredentials = async(prevState : unknown, formData : FormData) =>{

 const dataLogin = {
        email : formData.get('email') as string,
        password : formData.get('password') as string
    }
const validatedFields = LoginSchema.safeParse(Object.fromEntries(formData.entries()));
    if(!validatedFields.success){
        return {
            dataLogin : dataLogin,
            error: validatedFields.error.flatten().fieldErrors
        }
    }
    const {email , password } = validatedFields.data

    try {
        await signIn('credentials',{email,password, redirectTo : "/admin"} )
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: "Email dan Password Salah"}
                    break;
                default:
                    return { message : "Something went wrong!"}
            }
        }
        throw error;
    }
}

export const createPost = async(prevState : unknown,formData : FormData) => {
    const data = {
    title : formData.get('title'),
    deskripsi : formData.get('deskripsi'),
    rating : formData.get('rating'),
    release : formData.get('release'),
    genre : formData.getAll('genre'),
    studio : formData.getAll('studio'),
    imagePoster : formData.get('imagePoster'),
    imageBanner : formData.get('imageBanner'),
    source1 : formData.get('source1'),
    source2 : formData.get('source2'),
    source3 : formData.get('source3'),
    userId : formData.get('userId')
    }

     const dataPost = { 
    title : formData.get('title') as string,
    deskripsi : formData.get('deskripsi') as string,
    rating : formData.get('rating') as string,
    release : formData.get('release') as string,
    genre : formData.getAll('genre') ,
    studio : formData.getAll('studio'),
    imagePoster : formData.get('imagePoster') as string,
    imageBanner : formData.get('imageBanner') as string,
    source1 : formData.get('source1') as string,
    source2 : formData.get('source2') as string,
    source3 : formData.get('source3')  as string,
    userId : formData.get('userId' ) as string
    }

    const validatedFields = PostSchema.safeParse(data);


    if(!validatedFields.success){
        return{
            dataPost : dataPost,
            error : validatedFields.error.flatten().fieldErrors
        }
    }
    try{
        await prisma.post.create({
            data : {
                title : validatedFields.data.title,
                slug : validatedFields.data.title,
                deskripsi : validatedFields.data.deskripsi,
                rating: validatedFields.data.rating,
                release : validatedFields.data.release,
                genre : validatedFields.data.genre,
                studio : validatedFields.data.studio,
                imagePoster : validatedFields.data.imagePoster,
                imageBanner : validatedFields.data.imageBanner,
                userId : validatedFields.data.userId,
                source : [validatedFields.data.source1,validatedFields.data.source2,validatedFields.data.source3]


            },
        });
    }catch{
        return {message : "Failed Create post"}       
        }
    revalidatePath("/admin/posts")
    redirect("/admin/posts")
}

export const updatePost = async(id: string, prevState : unknown,formData : FormData) => {
    const data = {
    title : formData.get('title'),
    deskripsi : formData.get('deskripsi'),
    rating : formData.get('rating'),
    release : formData.get('release'),
    genre : formData.getAll('genre'),
    studio : formData.getAll('studio'),
    imagePoster : formData.get('imagePoster'),
    imageBanner : formData.get('imageBanner'),
    source1 : formData.get('source1'),
    source2 : formData.get('source2'),
    source3 : formData.get('source3'),
    userId : formData.get('userId')
    }

     const dataPost = { 
    title : formData.get('title') as string,
    deskripsi : formData.get('deskripsi') as string,
    rating : formData.get('rating') as string,
    release : formData.get('release') as string,
    genre : formData.getAll('genre') ,
    studio : formData.getAll('studio'),
    imagePoster : formData.get('imagePoster') as string,
    imageBanner : formData.get('imageBanner') as string,
    source1 : formData.get('source1') as string,
    source2 : formData.get('source2') as string,
    source3 : formData.get('source3')  as string,
    userId : formData.get('userId' ) as string
    }

    const validatedFields = PostSchema.safeParse(data);


    if(!validatedFields.success){
        return{
            dataPost : dataPost,
            error : validatedFields.error.flatten().fieldErrors
        }
    }
    try{
        await prisma.post.update({
            data : {
                title : validatedFields.data.title,
                slug : slugify(validatedFields.data.title),
                deskripsi : validatedFields.data.deskripsi,
                rating: validatedFields.data.rating,
                release : validatedFields.data.release,
                genre : validatedFields.data.genre,
                studio : validatedFields.data.studio,
                imagePoster : validatedFields.data.imagePoster,
                imageBanner : validatedFields.data.imageBanner,
                userId : validatedFields.data.userId,
                source : [validatedFields.data.source1,validatedFields.data.source2,validatedFields.data.source3]
            },
            where : {id}
        });
    }catch{
        return {message : "Failed Create post"}       
        }
    revalidatePath("/admin/posts")
    redirect("/admin/posts")
}

export const deletePost = async(id : string) => {

    const postId = await getPostVideoById(id)
    try{
        await prisma.post.delete({ 
            where : {id}
        })
    }
    catch{
        return {message : "delete failed"}
    }
    revalidatePath(`/admin/post-video/${postId?.postId}`);
}


export const createVideoPost = async(id: string, prevState : unknown,formData : FormData) => {
    const data = {
    title : formData.get('title'),
    deskripsi : formData.get('deskripsi'),
    linkVideo : formData.get('linkVideo'),
    duration : formData.get('duration'),
    episode : Number(formData.get('episode')),
    postId  : id
    }

     const dataVideoPost = { 
    title : formData.get('title') as string,
    deskripsi : formData.get('deskripsi') as string,
    linkVideo : formData.get('linkVideo') as string,
    duration : formData.get('duration') as string,
    episode : formData.get('episode') as string,
    }

    const validatedFields = PostVideoSchema.safeParse(data);


    if(!validatedFields.success){
        console.log(validatedFields.error.flatten().fieldErrors)
        return{
            dataVideoPost : dataVideoPost,
            error : validatedFields.error.flatten().fieldErrors
        }
    }
    try{
        await prisma.postVideo.create({
            data : {
                title : validatedFields.data.title,
                deskripsi : validatedFields.data.deskripsi,
                linkVideo: validatedFields.data.linkVideo,
                duration : validatedFields.data.duration,
                episode : validatedFields.data.episode,
                postId : validatedFields.data.postId
            },
        });
    }catch{
        return {message : "Failed Create post video"}       
        }
    revalidatePath(`/admin/post-video/${id}`)
    redirect(`/admin/post-video/${id}`)
}

export const updateVideoPost = async(id: string, prevState : unknown,formData : FormData) => {
    const data = {
    title : formData.get('title'),
    deskripsi : formData.get('deskripsi'),
    linkVideo : formData.get('linkVideo'),
    duration : formData.get('duration'),
    episode : Number(formData.get('episode')),
    postId  : formData.get('postId')
    }

     const dataVideoPost = { 
    title : formData.get('title') as string,
    deskripsi : formData.get('deskripsi') as string,
    linkVideo : formData.get('linkVideo') as string,
    duration : formData.get('duration') as string,
    episode : formData.get('episode') as string,
    }

    const validatedFields = PostVideoSchema.safeParse(data);


    if(!validatedFields.success){
        console.log(validatedFields.error.flatten().fieldErrors)
        return{
            dataVideoPost : dataVideoPost,
            error : validatedFields.error.flatten().fieldErrors
        }
    }
    try{
        await prisma.postVideo.update({
            data : {
                title : validatedFields.data.title,
                deskripsi : validatedFields.data.deskripsi,
                linkVideo: validatedFields.data.linkVideo,
                duration : validatedFields.data.duration,
                episode : validatedFields.data.episode,
            },
            where : {id}
        });
    }catch{
        return {message : "Failed Create post video"}       
        }
    revalidatePath(`/admin/post-video/${validatedFields.data.postId}`)
    redirect(`/admin/post-video/${validatedFields.data.postId}`)
}

export const deleteVideoPost = async(id : string) => {
    
    try{
        await prisma.postVideo.delete({ 
            where : {id}
        })
    }
    catch{
        return {message : "delete failed"}
    }
    revalidatePath("/admin/post");
}

