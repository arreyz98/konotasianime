import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password wajib diisi' },
        { status: 400 }
      )
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format email tidak valid' },
        { status: 400 }
      )
    }

    // Validasi panjang password
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password minimal 6 karakter' },
        { status: 400 }
      )
    }

    // Cek user sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true } // Hanya ambil id untuk efisiensi
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Simpan user baru
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        // createdAt otomatis ditambahkan oleh Prisma
      },
      select: {
        id: true,
        email: true,
        createdAt: true // Sertakan createdAt dalam response
      }
    })

    return NextResponse.json(
      { 
        success: true, 
        user: {
          id: newUser.id,
          email: newUser.email,
          createdAt: newUser.createdAt
        } 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}