import express from "express";
import authorsRouter from "./routes/authors.js";

const app = express();

// Middleware
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
    res.status(200).json({
        message: "MiniBlog API funcionando"
    });
});

app.use("/authors", authorsRouter);

export default app;