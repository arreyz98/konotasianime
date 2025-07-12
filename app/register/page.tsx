'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// ✅ Zod Schema
const registerSchema = z
  .object({
    email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
        const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
        })


       if (!res.ok) {
        const result = await res.json()
        toast.error(result.error || 'Gagal mendaftar', { style: { backgroundColor: '#4C6E49', color: '#fff' } })
        return
        }


      toast.success('Berhasil mendaftar!', {
        style: { backgroundColor: '#4C6E49', color: '#fff' },
      })

  // Auto login setelah register
      const signInResult = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (signInResult?.ok) {
        router.push('/admin/dashboard')
      } else {
        router.push('/login')
      }

    } catch{
      toast.error( 'Terjadi kesalahan', {
        style: { backgroundColor: '#4C6E49', color: '#fff' },
      })
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center text-white px-4 py-10">
      {/* Background */}
      <Image
        src="https://wallpapercave.com/wp/wp8596518.jpg"
        alt="Background"
        fill
        className="object-cover z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Form */}
      <div className="relative z-20 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-8 sm:px-10 sm:py-12 shadow-xl">
        <CardHeader className="flex flex-col items-center space-y-2">
          <Image src="/images/logo.svg" alt="Logo" width={100} height={100} priority />
          <CardTitle className="text-2xl font-bold text-white text-center">Daftar Akun</CardTitle>
          <p className="text-sm text-zinc-400 text-center">Buat akun admin Anda</p>
        </CardHeader>

        <CardContent className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className="h-12 bg-zinc-800 text-white border-zinc-700"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className="h-12 bg-zinc-800 text-white border-zinc-700"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                className="h-12 bg-zinc-800 text-white border-zinc-700"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#4C6E49] hover:bg-black disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Mendaftar...
                </span>
              ) : (
                'Daftar'
              )}
            </Button>

            <p className="text-center text-sm text-zinc-400 mt-4">
              Sudah punya akun?{' '}
              <Link href="/login" className="text-blue-500 hover:underline">Masuk</Link>
            </p>
          </form>
        </CardContent>
      </div>
    </main>
  )
}
