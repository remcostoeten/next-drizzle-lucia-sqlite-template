import * as schema from "@/core/server/schema";

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

export const client = createClient({
  url: process.env.DB_URL,
  authToken: process.env.AUTH_TOKEN
});

export const db = drizzle(client, { schema });
