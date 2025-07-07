import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const ITEMS_PER_PAGE = 10;


export const getUsers = async () =>{
    const session = await auth();
    if(!session || !session.user || session.user.role !== "admin")
        redirect("/login");

    try{
        const users = await prisma.user.findMany();
        return users;
    }catch(error){
        console.log(error);
    }
}

export const getPosts = async (query : string , currentPage : number) =>{
    const session = await auth();
    if(!session || !session.user || session.user.role !== "admin")
        redirect("/login");
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    try{
        const posts = await prisma.post.findMany({
            skip : offset,
            take : ITEMS_PER_PAGE,
            where : {
               title : {
                contains : query,
                mode : "insensitive"
               }
            },
            include:{ 
                user: { select: { name:true } }, 
                _count : {
                    select : {postVideo : true}
                }
            }
        });
        return posts;
    }catch(error){
        console.log(error);
    }
}

export const getPostHome = async () =>{
    try{
        const posts = await prisma.post.findMany();
        return posts;
    }catch(error){
        console.log(error);
    }
}

export const getPostPages = async (query : string) =>{

    try{
        const posts = await prisma.post.count({
            where : {
               title : {
                contains : query,
                mode : "insensitive"
               }
            },
        });
        const totalPages = Math.ceil(Number(posts) / ITEMS_PER_PAGE)
        return totalPages;
    }catch(error){
        console.log(error);
    }
}

export const getPostById = async (id : string) =>{
    // const session = await auth();
    // if(!session || !session.user || session.user.role !== "admin")
    //     redirect("/login");
    try{
        const post = await prisma.post.findUnique({
           where : {id}
        });
        return post;
    }catch(error){
        console.log(error);
    }
}

export const getPostBySlug = async (slug : string) =>{
    try{
        const post = await prisma.post.findFirst({
           where : {
            slug : {
                contains : slug
            }
           }
        });
        return post;
    }catch(error){
        console.log(error);
    }
}

export const getPostVideo = async () =>{

    try{
        const postVideo = await prisma.postVideo.findMany({
            include : {
                post : true
            }
        });
        return postVideo;
    }catch(error){
        console.log(error);
    }
}


export const getPostVideoById = async (id : string) =>{
    try{
        const postVideo = await prisma.postVideo.findUnique({
           where : {id}
        });
        return postVideo;
    }catch(error){
        console.log(error);
    }
}

export const getPostVideoByPostId = async (postId : string) =>{
    try{
        const postVideo = await prisma.postVideo.findFirst({
           where : {
            postId :{
                contains : postId
            }
           },
           include :{
            post : true
           }
        });
        return postVideo;
    }catch(error){
        console.log(error);
    }
}

export const getVideoByPostId = async (postId : string) =>{
    try{
        const postVideo = await prisma.postVideo.findMany({
           where : {
            postId :{
                contains : postId
            }
           },
        });
        return postVideo;
    }catch(error){
        console.log(error);
    }
}

export const getGenres = async () =>{
    const session = await auth();
    if(!session || !session.user || session.user.role !== "admin")
        redirect("/login");
    try{
        const genres = await prisma.genre.findMany()
        return genres;
    }catch(error){
        console.log(error);
    }
}