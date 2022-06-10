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
    if (!req.query.email || !req.query.videoId) {
      return res.json([]);
    }

    const email = req.query.email.toString();
    const user = await prisma.user.findUnique({ where: { email } });
    const videoId = req.query.videoId.toString();

    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: user?.id, videoId: videoId },
      orderBy: {
        startAt: 'asc',
      },
    });
    res.json(bookmarks);
  } else if (req.method === 'DELETE') {
    console.log(req.body);
    const bookmarkId = req.body.bookmarkId.toString();
    const email = req.body.email.toString();
    const bookmark = await prisma.bookmark.findUnique({ where: { id: bookmarkId } });
    const user = await prisma.user.findUnique({ where: { email } });

    if (bookmark?.userId !== user?.id) {
      return res.json([]);
    }

    const bookmarks = await prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
    res.json(bookmarks);
  }
}
