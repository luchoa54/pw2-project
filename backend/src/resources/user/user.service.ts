// src/resources/user/user.service.ts

import { PrismaClient } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "./user.types";
import bcrypt from "bcryptjs";
import { UserTypes } from "./userType/userType.constants";

const prisma = new PrismaClient();

const userSelect = {
  id: true,
  name: true,
  email: true,
  userTypeId: true,
  createdAt: true,
  updatedAt: true,
};

export const create = async (data: CreateUserDto) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      userTypeId: UserTypes.client,
    },
    select: userSelect,
  });
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