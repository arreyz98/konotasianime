import { z } from 'zod'

export const postSchema = z.object({
  title: z.string().min(1, 'Judul wajib diisi'),
  deskripsi: z.string().min(1, 'Deskripsi wajib diisi'),
  release: z.string().min(1, 'Tahun rilis wajib diisi'),
  imagePoster: z.string().url('Harus berupa URL gambar valid').min(1, 'Poster wajib diisi'),
  imageBanner: z.string().url('Harus berupa URL gambar valid').min(1,"Banner Wajib diisi"),
  genreIds: z.array(z.string().min(1)).min(1, 'Pilih minimal 1 genre'),
  studioIds: z.array(z.string().min(1)).min(1, 'Pilih minimal 1 studio'),
  source: z.array(z.string().url()).min(1, 'Minimal 1 sumber diperlukan'),
});


export type PostSchema = z.infer<typeof postSchema>