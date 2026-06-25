import pool from "../../db/config.js";

export const getPosts = async (req, res) => {
    try {

        const result = await pool.query(
            "SELECT * FROM posts ORDER BY id"
        );

        res.status(200).json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener posts"
        });

    }
};

export const getPostById = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM posts WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Post no encontrado"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al obtener post"
        });
    }
};

export const createPost = async (req, res) => {
    try {

        const { author_id, title, content, published } = req.body;

        // Validación
        if (!author_id || !title || !content) {
            return res.status(400).json({
                error: "Autor, título y contenido son obligatorios"
            });
        }

        const result = await pool.query(
            `
            INSERT INTO posts (author_id, title, content, published)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
            [author_id, title, content, published]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al crear post"
        });
    }
};