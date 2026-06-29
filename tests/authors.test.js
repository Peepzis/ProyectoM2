import { describe, test, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Authors API", () => {

    test("GET /authors debe responder con 200", async () => {

        const response = await request(app)
            .get("/authors");

        expect(response.statusCode).toBe(200);

    });

    test("GET /authors/:id debe responder con 404 si el autor no existe", async () => {

        const response = await request(app)
            .get("/authors/99999");

        expect(response.statusCode).toBe(404);

    });

    test("POST /authors sin nombre debe responder con 400", async () => {

        const response = await request(app)
            .post("/authors")
            .send({
                email: "prueba@test.com",
                bio: "Autor de prueba"
            });

        expect(response.statusCode).toBe(400);

    });

});