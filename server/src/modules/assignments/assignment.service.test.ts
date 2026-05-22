import { describe, expect, it } from "vitest";
import { assignLead } from "./assignment.service";

describe("assignLead", () => {
  it("assigns a matching source rule", () => {
    const assignee = assignLead(
      { source: "website", region: "MY" },
      [{ field: "source", value: "website", ownerId: "sales-1" }]
    );

    expect(assignee).toBe("sales-1");
  });
});
