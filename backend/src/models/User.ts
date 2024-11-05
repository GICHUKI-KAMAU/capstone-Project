import { PrismaClient, User as UserType } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

// Export Prisma type for User
export type User = UserType;

// Utility functions for interacting with the User model
export const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
  return prisma.user.create({ data });
};

export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: number): Promise<User> => {
  return prisma.user.delete({ where: { id } });
};
