-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'ARCHIVED', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Post" (
    "id" UUID NOT NULL,
    "title" VARCHAR(225) NOT NULL,
    "content" TEXT NOT NULL,
    "thumbnail" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "status" "PostStatus" NOT NULL DEFAULT 'PUBLISHED',
    "tags" TEXT[],
    "views" INTEGER NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,
    "status" "CommentStatus" NOT NULL DEFAULT 'APPROVED',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);
