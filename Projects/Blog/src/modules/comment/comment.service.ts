import { CommentStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const insert = async (payload: {
  content: string;
  authorId: string;
  postId: string;
  parentId?: string;
}) => {
  await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });

  if (payload.parentId) {
    await prisma.comment.findUniqueOrThrow({
      where: {
        id: payload.parentId,
      },
    });
  }
  return await prisma.comment.create({
    data: payload,
  });
};

const retrieve = async (id: string) => {
  return await prisma.comment.findUnique({
    where: {
      id,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true,
        },
      },
    },
  });
};

const retrieveByAuthor = async (authorId: string) => {
  return await prisma.comment.findMany({
    where: {
      authorId,
    },
    orderBy: { createdAt: "desc" },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

const destroy = async (commentId: string, authorId: string) => {
  const commentData = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });

  if (!commentData) {
    throw new Error("Your provided input is invalid!");
  }

  return await prisma.comment.delete({
    where: {
      id: commentData.id,
    },
  });
};

const modify = async (
  commentId: string,
  data: { content?: string; status?: CommentStatus },
  authorId: string
) => {
  const commentData = await prisma.comment.findFirst({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });

  if (!commentData) {
    throw new Error("Your provided input is invalid!");
  }

  return await prisma.comment.update({
    where: {
      id: commentId,
      authorId,
    },
    data,
  });
};

const moderateComment = async (id: string) => {
  const comment = await prisma.comment.findFirst({
    where: {
      id,
    },
  });

  if (!comment) {
    throw new Error("Something went wrong!");
  }

  let data: { status: CommentStatus } = { status: comment.status };

  if (comment.status === CommentStatus.APPROVED) {
    data.status = CommentStatus.REJECTED;
  }

  if (comment.status === CommentStatus.REJECTED) {
    data.status = CommentStatus.APPROVED;
  }
  return await prisma.comment.update({
    where: { id },
    data,
  });
};

export const CommentService = {
  insert,
  retrieve,
  retrieveByAuthor,
  destroy,
  modify,
  moderateComment,
};
