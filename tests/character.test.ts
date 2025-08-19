import request from "supertest";
import { app } from "../src/app";

describe("Character API", () => {
    it("GET /api/characters should return paginated array of characters with nemesis and secrets", async () => {
        const res = await request(app).get("/api/characters");

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("characters");
        expect(Array.isArray(res.body.characters)).toBe(true);
        expect(res.body).toHaveProperty("page");
        expect(res.body).toHaveProperty("pageSize");
        expect(res.body).toHaveProperty("total");
        expect(res.body).toHaveProperty("pages");

        if (res.body.characters.length > 0) {
            const first = res.body.characters[0];
            // character
            expect(first).toHaveProperty("data");
            expect(first.data).toHaveProperty("id");
            expect(first.data).toHaveProperty("name");
            expect(first.data).toHaveProperty("gender");

            // nemesis
            expect(first).toHaveProperty("children.has_nemesis.records");
            const nemeses = first.children.has_nemesis.records;
            if (nemeses.length > 0) {
                const nemesis = nemeses[0];
                expect(nemesis).toHaveProperty("data.id");
                expect(nemesis).toHaveProperty("data.character_id");
                expect(nemesis).toHaveProperty("children.has_secret.records");
                // secret
                const secrets = nemesis.children.has_secret.records;
                if (secrets.length > 0) {
                    const secret = secrets[0];
                    expect(secret).toHaveProperty("data.id");
                    expect(secret).toHaveProperty("data.secret_code");
                    expect(secret).toHaveProperty("data.nemesis_id");
                }
            }
        }
    });

    it("GET /api/characters with pagination should respect pageSize limit", async () => {
        const res = await request(app)
            .get("/api/characters")
            .query({ page: 1, pageSize: 5 });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("characters");
        expect(Array.isArray(res.body.characters)).toBe(true);
        expect(res.body.characters.length).toBeLessThanOrEqual(5);
        expect(res.body).toHaveProperty("page", 1);
        expect(res.body).toHaveProperty("pageSize", 5);
    });

    it("GET /api/characters with pageSize > 10 should return 400", async () => {
        const res = await request(app)
            .get("/api/characters")
            .query({ page: 1, pageSize: 20 });
            
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("error");
        expect(Array.isArray(res.body.error)).toBe(true);
    });
});
