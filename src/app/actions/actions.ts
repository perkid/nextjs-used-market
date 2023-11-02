'use server';
import bcrypt from 'bcryptjs';
import prisma from '@/libs/prismadb';

interface userDataProps {
  email: string;
  name: string;
  password: string;
}

export async function createUser({ email, name, password }: userDataProps) {
  const hashedPassword = await bcrypt.hash(password as string, 12);
  if (email !== null) {
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      }
    });
    return user
  }
}