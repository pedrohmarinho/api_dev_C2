import { Request, Response } from "express";
import CommentService from "../services/CommentService";
import { parse } from "path";

class CommentController {
  // Create Comment
  async createComment(req: Request, res: Response) {
    const { content, postId, userId } = req.body;

    if (!content || !postId || !userId) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing parameters" });
    }

    try {
      const newComment = await CommentService.createComment({
        content,
        post: { connect: { id: postId } },
        author: { connect: { id: userId } },
      });
      res.json({
        status: "ok",
        newComment,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          status: "error",
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "An unknown error occurred",
        });
      }
    }
  }

  // List Comments
  async listComments(req: Request, res: Response) {
    try {
      const comments = await CommentService.listComments();
      res.json({
        status: "ok",
        comments,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          status: "error",
          message: error.message,
        });
      } else {
        res.status(500).json({
          status: "error",
          message: "An unknown error occurred",
        });
      }
    }
  }

  // Update Comment
  async updateComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Missing ID",
      });
    }

    const { content } = req.body;
    if (!content) {
      res.json({
        status: "error",
        message: "Missing parameters",
      });
    }

    try {
      const updatedComment = await CommentService.updateComment(parseInt(id), {
        content,
      });
      res.json({
        status: "ok",
        newComment: updatedComment,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  // Delete Comment
  async deleteComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Missing ID",
      });
    }

    try {
      await CommentService.deleteComment(parseInt(id));
      res.json({
        status: "ok",
        message: "Comment deleted",
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }
}

export default new CommentController();
