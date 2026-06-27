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

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { author_id, title, content, published } = req.body;

        // Validación
        if (!author_id || !title || !content) {
            return res.status(400).json({
                error: "author_id, title y content son obligatorios"
            });
        }

        const result = await pool.query(
            `
            UPDATE posts
            SET
                author_id = $1,
                title = $2,
                content = $3,
                published = $4
            WHERE id = $5
            RETURNING *
            `,
            [author_id, title, content, published, id]
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
            error: "Error al actualizar post"
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `
            DELETE FROM posts
            WHERE id = $1
            RETURNING *
            `,
            [id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Post no encontrado"
            });
        }
        res.status(200).json({
    message: "Post eliminado correctamente"
});
    } catch (error){
        console.error(error);
        res.status(500).json({
            error: "Error al borrar Post"
        });
    }
}

export const getPostsByAuthor = async (req, res) => {
    try {
        const { authorId } = req.params;

        const result = await pool.query(
            `
           SELECT
        posts.*,
        authors.name,
        authors.email
    FROM posts
    INNER JOIN authors
        ON posts.author_id = authors.id
    WHERE posts.author_id = $1
            `,
            [authorId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "No se encontraron posts para este autor"
            });
        }

        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al obtener los posts del autor"
        });
    }
};