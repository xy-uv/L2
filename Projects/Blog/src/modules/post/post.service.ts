import { Post } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const insert = async (
  payload: Omit<Post, "id" | "createdAt" | "updatedAt" | "authorId">,
  userId: string
) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });
  return result;
};

const retrieves = async () => {
  const result = await prisma.post.findMany();
  return result;
};

export const PostServices = { insert, retrieves };
