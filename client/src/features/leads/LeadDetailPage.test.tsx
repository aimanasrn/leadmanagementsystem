import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LeadDetailPage } from "./LeadDetailPage";

describe("LeadDetailPage", () => {
  it("renders timeline and task sections", () => {
    render(<LeadDetailPage />);
    expect(screen.getByText(/activity timeline/i)).toBeInTheDocument();
    expect(screen.getByText(/tasks/i)).toBeInTheDocument();
  });
});
