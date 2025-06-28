import { object , string } from "zod";

export const LoginSchema = object({
    email : string().email("Invalid Email"),
    password : string().min(5, "Password tidak boleh kosong")
})

export const RegisterSchema = object({
    email : string().email("Invalid Email"),
    name : string().min(5, "Username tidak boleh kosong"),
    password : string().min(5, "Password tidak boleh kosong")
})
