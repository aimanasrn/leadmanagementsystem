import { describe, expect, it } from "vitest";
import { parseLeadCsv } from "./imports.service";

describe("parseLeadCsv", () => {
  it("returns row-level errors for invalid records", () => {
    const result = parseLeadCsv("firstName,lastName,email\nAina,,aina@example.com");
    expect(result.errors).toEqual([{ row: 2, message: "lastName is required" }]);
  });
});
