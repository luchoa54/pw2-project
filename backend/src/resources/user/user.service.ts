// src/resources/user/user.service.ts

import { PrismaClient } from "@prisma/client";
import { UpdateUserDto } from "./user.types";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const userSelect = {
  id: true,
  name: true,
  email: true,
  userTypeId: true,
  createdAt: true,
  updatedAt: true,
};

export const findAll = async () => {
  return prisma.user.findMany({
    select: userSelect,
  });
};

export const findById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });
};

export const update = async (id: string, data: UpdateUserDto) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  return prisma.user.update({
    where: { id },
    data,
    select: userSelect,
  });
};

export const remove = async (id: string) => {
  return prisma.user.delete({
    where: { id },
    select: userSelect,
  });
};