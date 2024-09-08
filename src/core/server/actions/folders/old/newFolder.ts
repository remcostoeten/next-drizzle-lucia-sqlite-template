import { db } from "../../db"; // Assuming you have a db instance
import { folders } from "../../schema/folders";

export async function createNewFolder(folderName: string, userId: string) {
  const newFolder = await db.insert(folders).values({
    name: folderName,
    userId: userId,
  }).returning();

  return newFolder;
}

