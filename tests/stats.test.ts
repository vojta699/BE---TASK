import request from "supertest";
import { app } from '../src/app';

describe("Stats API", () => {
  it("GET /api/stats should return object with correct structure", async () => {
    const res = await request(app).get("/api/stats");

    expect(res.status).toBe(200);
    expect(typeof res.body).toBe("object");

    expect(res.body).toHaveProperty("characters_count");
    expect(typeof res.body.characters_count).toBe("number");

    expect(res.body).toHaveProperty("average_age");
    expect(typeof res.body.average_age).toBe("object");
    expect(res.body.average_age).toHaveProperty("characters");
    expect(typeof res.body.average_age.characters).toBe("number");
    expect(res.body.average_age).toHaveProperty("nemeses");
    expect(typeof res.body.average_age.nemeses).toBe("number");

    expect(res.body).toHaveProperty("average_weight");
    expect(typeof res.body.average_weight).toBe("number");

    expect(res.body).toHaveProperty("genders");
    expect(typeof res.body.genders).toBe("object");
    expect(res.body.genders).toHaveProperty("male");
    expect(typeof res.body.genders.male).toBe("number");
    expect(res.body.genders).toHaveProperty("female");
    expect(typeof res.body.genders.female).toBe("number");
    expect(res.body.genders).toHaveProperty("other");
    expect(typeof res.body.genders.other).toBe("number");
  });
});