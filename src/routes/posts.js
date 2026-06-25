import express from "express";
import {
    getPosts,
    getPostById,
    createPost
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPostById);

//consultar
router.post("/", createPost);

//router.put("/:id", updatePost);

//router.delete("/:id", deletePost);

export default router;