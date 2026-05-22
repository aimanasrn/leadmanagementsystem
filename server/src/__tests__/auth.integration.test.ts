import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../app";

describe("auth routes", () => {
  it("rejects invalid login", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "missing@example.com",
      password: "bad-password"
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });
});
