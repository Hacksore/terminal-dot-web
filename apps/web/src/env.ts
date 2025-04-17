import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CLIENT_ID: z.string().min(1),
    CLIENT_SECRET: z.string().min(1),
    TERMINAL_BEARER_TOKEN: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    TERMINAL_BEARER_TOKEN: process.env.TERMINAL_BEARER_TOKEN,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
