'use client';

import Head from 'next/head';

type Props = {
  images: string[];
};

export default function PreloadImages({ images }: Props) {
  return (
    <Head>
      {images.map((src, i) => (
        <link
          key={i}
          rel="preload"
          as="image"
          href={src}
        />
      ))}
    </Head>
  );
}
