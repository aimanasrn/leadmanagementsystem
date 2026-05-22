import { z } from "zod";

export const createLeadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().min(1).optional(),
  source: z.string().min(1)
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
