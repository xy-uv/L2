import { Post, PostStatus } from "../../generated/prisma/client";
import { PostWhereInput } from "../../generated/prisma/models";
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

const retrieves = async ({
  search,
  tags,
  isFeatured,
  status,
  authorId,
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  search: string | undefined;
  tags: string[] | [];
  isFeatured: boolean | undefined;
  status: PostStatus | undefined;
  authorId: string | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}) => {
  const andConditions: PostWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: search,
          },
        },
      ],
    });
  }

  if (tags.length > 0) {
    andConditions.push({
      tags: {
        hasEvery: tags,
      },
    });
  }

  if (typeof isFeatured === "boolean") {
    andConditions.push({ isFeatured });
  }

  if (typeof status === "string") {
    andConditions.push({ status });
  }
  if (typeof authorId === "string") {
    andConditions.push({ authorId });
  }
  const result = await prisma.post.findMany({
    where: {
      AND: andConditions,
    },
  });
  return result;
};

export const PostServices = { insert, retrieves };
