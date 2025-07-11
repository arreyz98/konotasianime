export interface Post {
  id: string
  title: string
  slug: string
  deskripsi?: string
  release?: string
  imagePoster?: string
  imageBanner?: string
  source: string[]
  genres: { genreId: string }[]
  studios: { studioId: string }[]
}

export interface Genre {
  id: string
  name: string
}

export interface Studio {
  id: string
  name: string
}
