import express from "express";
import authorsRouter from "./routes/authors.js";
import postRouter from "./routes/posts.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "MiniBlog API funcionando"
    });
});

app.use("/authors", authorsRouter);
app.use("/posts", postRouter);

export default app;