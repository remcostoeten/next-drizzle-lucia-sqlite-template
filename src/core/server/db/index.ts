import * as schema from "@/core/server/schema";

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

export const client = createClient({
  url: 'libsql://correct-karma-remcostoeten.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjU2NzAzMzgsImlkIjoiOWMxYjFkYjUtMTgxNi00OTM0LTg2YzUtMGYyNGNjN2M2NjQzIn0.zz2Lxb7GlDHCqDTfhhwTcoST02BbJc44BQCqQF61lJ_1vrweyvXJaj2-xCcn4-9JIaZhULmshmzIS4CGWMp5BQ'
});

export const db = drizzle(client, { schema });
