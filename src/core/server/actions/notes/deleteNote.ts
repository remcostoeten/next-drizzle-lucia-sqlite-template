import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "../../db"
import { notes } from "../../schema"

export async function s(formData: FormData) {
  const id = formData.get('id') as string

  await db.delete(notes).where(eq(notes.id, parseInt(id)))

  revalidatePath('/dashboard/notes')
}
