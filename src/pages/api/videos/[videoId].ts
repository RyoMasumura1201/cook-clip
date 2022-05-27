import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const videoId = req.query.videoId as string;
  const video = await prisma.video.findUnique({ where: { videoId } });

  res.json(video);
}
