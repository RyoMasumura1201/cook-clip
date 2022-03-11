import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
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
  }
}
