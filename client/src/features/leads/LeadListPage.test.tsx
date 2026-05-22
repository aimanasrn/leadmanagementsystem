import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LeadListPage } from "./LeadListPage";

describe("LeadListPage", () => {
  it("renders stage and source filters", () => {
    render(<LeadListPage />);
    expect(screen.getByLabelText(/stage/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/source/i)).toBeInTheDocument();
  });
});
