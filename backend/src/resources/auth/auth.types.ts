import { User } from '@prisma/client';

export type LoginDto = Pick<User, 'email' | 'password'>;
export type SignUpDto = Pick<User, 'name' | 'email' | 'password' | 'userTypeId'>;