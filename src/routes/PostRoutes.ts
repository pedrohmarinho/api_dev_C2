import { Router } from "express";
import PostController from "../controllers/PostController";

const router = Router();

router.post("/posts", PostController.createPost);
router.get("/posts", PostController.listPosts);
router.patch("/posts/:id", PostController.updatePost);
router.delete("/posts/:id", PostController.deletePost);
