import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from '..';

export const folders = sqliteTable('folder', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  color: text('color').notNull(),
  userId: integer('user_id', { mode: 'number' })
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().defaultNow(),
});

export type Folder = typeof folders.$inferSelect;
