
import { relations } from "drizzle-orm";
import { noteTags } from "./note-tags";
import { notes } from "./notes";
import { sharedNotes } from "./shared-notes";
import { tags } from "./tags";
import { users } from "../../schema";

export const notesRelations = relations(notes, ({ one, many }) => ({
  user: one(users, {
    fields: [notes.userId],
    references: [users.id],
  }),
  folder: one(folders, {
    fields: [notes.folderId],
    references: [folders.id],
  }),
  tags: many(noteTags),
  sharedNotes: many(sharedNotes),
}));

export const foldersRelations = relations(folders, ({ one, many }) => ({
  user: one(users, {
    fields: [folders.userId],
    references: [users.id],
  }),
  parentFolder: one(folders, {
    fields: [folders.parentId],
    references: [folders.id],
  }),
  childFolders: many(folders),
  notes: many(notes),
}));

export const tagsRelations = relations(tags, ({ one, many }) => ({
  user: one(users, {
    fields: [tags.userId],
    references: [users.id],
  }),
  notes: many(noteTags),
}));

export const noteTagsRelations = relations(noteTags, ({ one }) => ({
  note: one(notes, {
    fields: [noteTags.noteId],
    references: [notes.id],
  }),
  tag: one(tags, {
    fields: [noteTags.tagId],
    references: [tags.id],
  }),
}));

export const sharedNotesRelations = relations(sharedNotes, ({ one }) => ({
  note: one(notes, {
    fields: [sharedNotes.noteId],
    references: [notes.id],
  }),
  sharedWithUser: one(users, {
    fields: [sharedNotes.sharedWithUserId],
    references: [users.id],
  }),
}));


