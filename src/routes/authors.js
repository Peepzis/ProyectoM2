import express from "express";
import {
    getAuthors,
    getAuthorById,
    createAuthor
} from "../controllers/authorController.js";

const router = express.Router();

// GET /authors
router.get("/", getAuthors);

// GET /authors/:id
router.get("/:id", getAuthorById);

// POST /authors
router.post("/", createAuthor);

export default router;