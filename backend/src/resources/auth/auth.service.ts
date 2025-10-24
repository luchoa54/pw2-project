import bcrypt from "bcryptjs"
import { PrismaClient, User } from "@prisma/client";
import { LoginDto, SignUpDto } from './auth.types';
import { UserTypes } from '../user/userType/userType.constants';
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

export const checkCredentials = async (userId: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { userTypeId: true },
  });

  if (!user) { return false; }
  return user.userTypeId === UserTypes.admin;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (data: SignUpDto): Promise<User> => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      userTypeId: UserTypes.client,
    },
  });
  return newUser;
};