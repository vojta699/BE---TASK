import request from "supertest";
import { app } from '../src/app';

describe("Secret API", () => {
  it("GET /api/secrets should return array", async () => {
    const res = await request(app).get("/api/secrets");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
