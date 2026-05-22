import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ImportPage } from "./ImportPage";

describe("ImportPage", () => {
  it("renders upload CTA and validation summary heading", () => {
    render(<ImportPage />);
    expect(screen.getByRole("button", { name: /upload csv/i })).toBeInTheDocument();
    expect(screen.getByText(/validation summary/i)).toBeInTheDocument();
  });
});
