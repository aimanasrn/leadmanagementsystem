import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1)
});

export const env = schema.parse(process.env);
