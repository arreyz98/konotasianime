"use server";
import { RegisterSchema, LoginSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

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