import { z } from "zod";

export const signupInput = z.object({
  username: z.string(),
  password: z.string().min(4),
});

export type SignUpParams = z.infer<typeof signupInput>;
