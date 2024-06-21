import { PrismaClient, Prisma, Post } from "@prisma/client";

const prisma = new PrismaClient();

class PostDatabaseService {
  async listPosts(): Promise<Post[]> {
    try {
      return await prisma.post.findMany();
    } catch (error: unknown) {
      const mensagem =
        error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
      console.error("Erro ao listar os posts:", mensagem);
      return [];
    }
  }

  async createPost(post: Prisma.PostCreateInput): Promise<Post | null> {
    try {
      const newPost = await prisma.post.create({
        data: post,
      });
      return newPost;
    } catch (error: unknown) {
      const mensagem =
        error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
      console.error("Erro ao inserir o post:", mensagem);
      return null;
    }
  }

  async updatePost(
    id: number,
    post: Prisma.PostUpdateInput
  ): Promise<Post | null> {
    try {
      const updatedPost = await prisma.post.update({
        where: { id },
        data: post,
      });
      return updatedPost;
    } catch (error: unknown) {
      const mensagem =
        error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
      console.error(`Erro ao atualizar o post com ID ${id}:`, mensagem);
      return null;
    }
  }

  async deletePost(id: number): Promise<boolean> {
    try {
      await prisma.post.delete({
        where: { id },
      });
      return true;
    } catch (error: unknown) {
      const mensagem =
        error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
      console.error(`Erro ao deletar o post com ID ${id}:`, mensagem);
      return false;
    }
  }
}

export default new PostDatabaseService();
