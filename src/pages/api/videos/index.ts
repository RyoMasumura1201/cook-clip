import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { Video, Prisma } from '@prisma/client';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const searchText = '%' + req.query.searchText?.toString() + '%';
  const videos = await prisma.$queryRaw<Video[]>(
    Prisma.sql`SELECT * FROM Video WHERE title LIKE ${searchText}`,
  );
  res.json(videos);
}
