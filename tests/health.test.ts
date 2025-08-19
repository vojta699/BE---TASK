import request from "supertest";
import { app } from '../src/app';

describe("Health API", () => {
  it("GET /api/health should return object { ok: true }", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});