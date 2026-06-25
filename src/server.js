import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool from "../db/config.js";

const PORT = process.env.PORT || 3000;

try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ PostgreSQL conectado");
    console.log("Hora BD:", result.rows[0].now);
} catch (error) {
    console.error("❌ Error al conectar PostgreSQL");
    console.error(error.message);
}

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});