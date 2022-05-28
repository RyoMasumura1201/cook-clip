import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { name, email } = req.body;
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { name, email },
  });
  res.json(user);
}
