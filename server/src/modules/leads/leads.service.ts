import type { CreateLeadInput } from "./leads.schemas";

type ExistingLead = { id: string; email?: string | null; phone?: string | null };

export function detectDuplicates(input: CreateLeadInput, existing: ExistingLead[]) {
  const warnings: string[] = [];

  if (input.email && existing.some((lead) => lead.email === input.email)) {
    warnings.push("Duplicate email found");
  }

  if (input.phone && existing.some((lead) => lead.phone === input.phone)) {
    warnings.push("Duplicate phone found");
  }

  return warnings;
}

export function buildLeadResponse(input: CreateLeadInput) {
  return {
    id: "lead-dev-1",
    ...input,
    stage: "NEW",
    warnings: []
  };
}
