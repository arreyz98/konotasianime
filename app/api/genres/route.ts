import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  //get all posts
  const posts = await prisma.genre.findMany();

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: "List Data Posts",
      data: posts,
    },
    {
      status: 200,
    }
  );
}