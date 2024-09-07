import { revalidatePath } from "next/cache"
import { db } from "../../db"
import { folders } from "../../schema/folders"

export async function createFolder(formData: FormData) {
  const name = formData.get('name') as string
  const parentId = formData.get('parentId') as string | null

  await db.insert(folders).values({
    id: crypto.randomUUID(),
    name,
    parentId,
    userId: 'user-id', // Replace with actual user ID from authentication
  })

  revalidatePath('/dashboard/notes')
}
export * from "./createFolder"
export * from "./deleteFolder"
export * from "./getFolders"
export * from "./newFolder"

