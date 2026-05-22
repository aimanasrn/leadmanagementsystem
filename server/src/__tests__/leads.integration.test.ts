import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../app";

describe("lead creation", () => {
  it("creates a lead and returns duplicate warnings", async () => {
    const response = await request(app)
      .post("/leads")
      .set("x-dev-role", "ADMIN")
      .send({
        firstName: "Aina",
        lastName: "Rahman",
        email: "aina@example.com",
        phone: "0123456789",
        source: "website"
      });

    expect(response.status).toBe(201);
    expect(response.body.stage).toBe("NEW");
    expect(response.body.warnings).toEqual([]);
  });
});
