import { integer, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { users } from "..";

const sqliteTable = sqliteTableCreator((name) => `app_${name}`);

export const folders = sqliteTable("folders", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  parentId: text("parent_id").references(() => folders.id),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});

export type Folder = typeof folders.$inferSelect;
