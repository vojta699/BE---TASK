import request from "supertest";
import { app } from '../src/app';

describe("Nemesis API", () => {
  it("GET /api/nemesis should return array", async () => {
    const res = await request(app).get("/api/nemesis");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
