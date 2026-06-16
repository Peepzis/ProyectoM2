import pool from "../../db/config.js";

export const getAuthors = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM authors ORDER BY id"
        );

        res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al obtener autores"
        });
    }
};

export const getAuthorById = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM authors WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Autor no encontrado"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al obtener autor"
        });
    }
};

export const createAuthor = async (req, res) => {
    try {

        const { name, email, bio } = req.body;

        // Validación
        if (!name || !email) {
            return res.status(400).json({
                error: "Name y email son obligatorios"
            });
        }

        const result = await pool.query(
            `
            INSERT INTO authors (name, email, bio)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [name, email, bio]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error al crear autor"
        });
    }
};