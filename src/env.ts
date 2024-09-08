

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.string().optional(),
    DB_URL: z.string().min(1),
    AUTH_TOKEN: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GITHUB_CLIENT_ID: z.string().min(1),
    HOST_NAME: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL,
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    HOST_NAME: process.env.HOST_NAME,
  },
});
