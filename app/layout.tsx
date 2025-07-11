
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Norinime",
  description: "Nonton Resmi Anime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
          <Toaster
          position="top-center"
          theme="light" // tidak pakai dark/richColors bawaan
          toastOptions={{
            className: 'bg-zinc-900 text-white border border-zinc-700 shadow-lg rounded-md px-4 py-3',
            style: {
              backgroundColor: '#18181b', // bg-zinc-900
              color: '#fff',
              border: '1px solid #3f3f46', // border-zinc-700
              fontSize: '14px',
              borderRadius: '8px',
            },
          }}
        />
      </body>
    </html>
  );
}
