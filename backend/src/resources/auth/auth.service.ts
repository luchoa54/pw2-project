import bcrypt from "bcryptjs"
import { PrismaClient, User } from "@prisma/client";
import { LoginDto } from './auth.types';
import { UserTypes } from '../userType/userType.constants';
const prisma = new PrismaClient();

export const checkAuth = async (
  credenciais: LoginDto,
): Promise<User | null> => {
  const { email, password } = credenciais;
  const usuario = await prisma.user.findUnique({ where: { email } });
  if (!usuario) {return null;}
  const ok = await bcrypt.compare(password, usuario.password);
  if (ok) { return usuario; }
  return null;
};

export const checkIsAdmin = async (userId: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { userTypeId: true },
  });

  if (!user) { return false; }
  return user.userTypeId === UserTypes.ADMIN;
};