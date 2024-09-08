import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "../../db"
import { folders } from "../../schema/folders"
 
export async function s(formData: FormData) {
  const id = formData.get('id') as string

  await db.delete(folders).where(eq(folders.id, id))

  revalidatePath('/dashboard/notes')
}
