import { Router } from "express";
import PostController from "../controllers/post.controller";
import { auth } from "../middlewares/auth.middleware";

const router: Router = Router();

router.post("/me", auth, PostController.createPost);
router.get("/me", auth, PostController.getMyPosts);
router.get("/me/:id", auth, PostController.getMyPostById);
router.patch("/me/:id", auth, PostController.updatePost);
router.delete("/me/:id", auth, PostController.deletePost);
router.get("/", auth, PostController.getPosts);
router.get("/:id", auth, PostController.getPostById);

export default router;
