import { Response, Request } from "express";
import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient();

const checkUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    console.log('Checking user with email:', email);

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (user) {
      const userId = user.id;
      console.log('User found with ID:', userId);
      return res.json({ userExists: true, userId });
    } else {
      console.log('User does not exist in the database.');
      return res.json({ userExists: false });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
};

export default checkUser;
