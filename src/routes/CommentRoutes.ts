import { Router } from "express";
import CommentController from "../controllers/CommentController";

const CommentRouter = Router();

CommentRouter.post("/api/comments", CommentController.createComment);

CommentRouter.get("/api/comments", CommentController.listComments);

CommentRouter.patch("/api/comment/:id", CommentController.updateComment);

CommentRouter.delete("/api/comment/:id", CommentController.deleteComment);

export default CommentRouter;
