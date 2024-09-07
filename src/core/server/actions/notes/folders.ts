"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { folders } from "../../schema/folders";
import { db } from "../../db"
import { notes } from "../../schema/notes"
export async function getFolders(sessionId: string) {
  const { user, session } = await lucia.validateSession(sessionId);

  if (!session) {
    throw new Error("Unauthorized");
  }

  return await db.select().from(folders).where(eq(folders.userId, user.id));
}

export async function createFolder(formData: FormData, sessionId: string) {
  const name = formData.get('folderName') as string;
  const result = await lucia.validateSession(sessionId);

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!name) {
    throw new Error("Folder name is required");
  }

  const newFolder = await db
    .insert(folders)
    .values({
      id: generateId("folder"),
      userId: user.id,
      name,
    })
    .returning();

  revalidatePath("/dashboard/notes");
  return newFolder[0];
}

export async function deleteFolder(folderId: string, sessionId: string) {
  const { user, session } = await lucia.validateSession(sessionId);

  if (!session) {
    throw new Error("Unauthorized");
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            b                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

  await db.transaction(async (tx) => {
    // Move all notes in this folder to have no folder (or to a default folder if you prefer)
    await tx.update(notes).set({ folderId: null }).where(eq(notes.folderId, folderId));

    // Recursively delete all sub-folders
    await deleteSubFolders(tx, folderId);

    // Delete the folder itself
    await tx.delete(folders).where(eq(folders.id, folderId));
  });

  revalidatePath("/dashboard/notes");
}

export async function updateFolder(folderId: string, name: string, sessionId: string) {
  const { user, session } = await lucia.validateSession(sessionId);

  if (!session) {
    throw new Error("Unauthorized");
  }

  await db.update(folders).set({ name }).where(eq(folders.id, folderId));
  revalidatePath("/dashboard/notes");
}

async function deleteSubFolders(tx: any, parentId: string) {
  const subFolders = await tx
    .select({ id: folders.id })
    .from(folders)
    .where(eq(folders.parentId, parentId));

  for (const subFolder of subFolders) {
    // Move notes in sub-folder to have no folder
    await tx
      .update(notes)
      .set({ folderId: null })
      .where(eq(notes.folderId, subFolder.id));

    // Recursively delete sub-sub-folders
    await deleteSubFolders(tx, subFolder.id);

    // Delete the sub-folder
    await tx.delete(folders).where(eq(folders.id, subFolder.id));
  }
}
