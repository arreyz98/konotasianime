'use client'

import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import Image from 'next/image'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// ✅ Validasi dengan Zod
const schema = z.object({
  email: z.string().email({ message: 'Email tidak valid' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
})

type LoginForm = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)

    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    })

    if (result?.ok) {
      toast.success('Login berhasil! Mengalihkan...')
      router.push('/admin/dashboard')
    } else {
      toast.error('Email atau password salah.')
    }

    setLoading(false)
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center text-white px-4 py-10">
      {/* 🔳 Background Image */}
      <Image
        src="https://wallpapercave.com/wp/wp8596518.jpg"
        alt="Background"
        fill
        className="object-cover z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* 🧱 Form Login */}
      <div className="relative z-20 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-8 sm:px-10 sm:py-12 shadow-xl">
        <CardHeader className="flex flex-col items-center space-y-2">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={100}
            height={100}
            priority
          />
          <CardTitle className="text-2xl font-bold text-white text-center">Login Admin</CardTitle>
          <p className="text-sm text-zinc-400 text-center">Masuk untuk melanjutkan</p>
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
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
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
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#4C6E49] hover:bg-black"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Sedang masuk...
                </span>
              ) : (
                'Masuk'
              )}
            </Button>

            <p className="text-center text-sm text-zinc-400 mt-4">
              Belum punya akun?{' '}
              <Link href="/register" className="text-blue-500 hover:underline">Daftar</Link>
            </p>
          </form>
        </CardContent>
      </div>
    </main>
  )
}
