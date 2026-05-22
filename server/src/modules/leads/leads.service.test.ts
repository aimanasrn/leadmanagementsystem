import { describe, expect, it } from "vitest";
import { detectDuplicates } from "./leads.service";

describe("detectDuplicates", () => {
  it("warns when email matches an existing lead", () => {
    const warnings = detectDuplicates(
      { firstName: "Aina", lastName: "Rahman", email: "lead@example.com", phone: "111", source: "website" },
      [{ id: "lead-1", email: "lead@example.com", phone: "222" }]
    );

    expect(warnings).toEqual(["Duplicate email found"]);
  });
});
