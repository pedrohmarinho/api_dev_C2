import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

class CommentService {
  async createComment(data: Prisma.CommentCreateInput) {
    try {
      return await prisma.comment.create({
        data,
      });
    } catch (error) {
      throw new Error("Error creating comment");
    }
  }

  async listComments() {
    try {
      return await prisma.comment.findMany({
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          post: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error("Error fetching comments");
    }
  }

  async updateComment(id: number, data: Prisma.CommentUpdateInput) {
    try {
      return await prisma.comment.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw new Error("Error updating comment");
    }
  }

  async deleteComment(id: number) {
    try {
      await prisma.comment.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error("Error deleting comment");
    }
  }
}

export default new CommentService();
