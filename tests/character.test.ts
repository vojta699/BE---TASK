import request from "supertest";
import { app } from '../src/app';

describe("Character API", () => {
  it("GET /api/characters should return array of characters", async () => {
    const res = await request(app).get("/api/characters");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});