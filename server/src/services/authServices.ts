import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { User } from "../generated/prisma/client";

const prisma = new PrismaClient();

interface UserInfo {
  id: number;
  username: string;
  contactNumber: string;
  role: string;
}

export async function loginUser(
  username: string,
  password: string
): Promise<UserInfo | null> {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return null;

  return (await verifyUser(password, user.password))
    ? {
        id: user.id,
        username: user.username,
        contactNumber: user.contactNumber,
        role: user.role,
      }
    : null;
}

async function verifyUser(input: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(input, hash);
}
