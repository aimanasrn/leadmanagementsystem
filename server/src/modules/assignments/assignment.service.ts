export type AssignmentRule = {
  field: "source" | "region";
  value: string;
  ownerId: string;
};

type LeadInput = {
  source?: string;
  region?: string;
};

export function assignLead(lead: LeadInput, rules: AssignmentRule[]) {
  const match = rules.find((rule) => lead[rule.field] === rule.value);
  return match?.ownerId ?? null;
}
