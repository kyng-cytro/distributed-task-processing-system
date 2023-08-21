import { z } from "zod";

export const workerSchema = z.object({
  name: z.string().min(1),
  endpoint: z.string().min(1),
  job: z.string().min(1),
  status: z.enum(["active", "busy", "down"]),
  uptime: z.number(),
});

export type worker = z.infer<typeof workerSchema>;
