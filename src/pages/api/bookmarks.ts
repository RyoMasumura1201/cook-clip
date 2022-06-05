import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, startAt, videoId, email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const bookmark = await prisma.bookmark.create({
        data: {
          title: title,
          startAt: startAt,
          videoId: videoId,
          userId: user.id,
        },
      });
      res.json(bookmark);
    }
  } else if (req.method === 'GET') {
    const userId = req.query.userId?.toString();
    const videoId = req.query.videoId?.toString();

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: userId, videoId: videoId },
      orderBy: {
        startAt: 'asc',
      },
    });
    res.json(bookmarks);
  }
}
