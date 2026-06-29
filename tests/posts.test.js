import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Posts API", () => {

    test("GET /posts debe responder con 200", async () => {

        const response = await request(app)
            .get("/posts");

        expect(response.statusCode).toBe(200);

    });

    test("GET /posts/:id debe responder con 404 si el posts no existe", async () => {

        const response = await request(app)
            .get("/posts/99999");

        expect(response.statusCode).toBe(404);

    });

    test("POST /posts sin title debe responder con 400", async () => {

    const response = await request(app)
        .post("/posts")
        .send({
            author_id: 1,
            content: "Contenido de prueba",
            published: true
        });

    expect(response.statusCode).toBe(400);

    });

});