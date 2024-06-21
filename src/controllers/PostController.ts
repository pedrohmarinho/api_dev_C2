import { Request, Response } from "express";
import PostService from "../services/PostDataBaseService";

class PostController {
  // Create Post
  async createPost(req: Request, res: Response) {
    const { title, content, authorId, published } = req.body;

    try {
      const newPost = await PostService.createPost({
        title,
        content,
        published,
        author: { connect: { id: parseInt(authorId) } },
      });

      return res.status(201).json(newPost);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
      return res.status(500).json({ status: "error", message });
    }
  }

  // Get all posts
  async listPosts(req: Request, res: Response) {
    try {
      const posts = await PostService.listPosts();
      return res.status(200).json(posts);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
      return res.status(500).json({ status: "error", message });
    }
  }

  // Update a post
  async updatePost(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { title, content, published } = req.body;

    try {
      const updatedPost = await PostService.updatePost(id, {
        title,
        content,
        published,
      });
      if (!updatedPost) {
        return res
          .status(404)
          .json({ status: "error", message: "Post não encontrado" });
      }
      return res.status(200).json(updatedPost);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
      return res.status(500).json({ status: "error", message });
    }
  }

  // Delete a post
  async deletePost(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);

    try {
      const deleted = await PostService.deletePost(id);
      if (!deleted) {
        return res
          .status(404)
          .json({ status: "error", message: "Post não encontrado" });
      }
      return res.status(204).send();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Ocorreu um erro desconhecido";
      return res.status(500).json({ status: "error", message });
    }
  }
}

export default new PostController();
