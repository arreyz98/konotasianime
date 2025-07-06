import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id as string;

  if (req.method === 'GET') {
   const postVideo = await prisma.postVideo.findMany({
           where : {
            postId :{
                contains : postId
            }
           },
        });
    if (!postVideo) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json(postVideo);
  }
}