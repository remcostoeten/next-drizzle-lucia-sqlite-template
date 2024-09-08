import { env } from "@/env";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  schema: "./src/core/server/schema/",
  out: "./migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: env.DB_URL!,
    authToken: env.AUTH_TOKEN!,
  },
});
