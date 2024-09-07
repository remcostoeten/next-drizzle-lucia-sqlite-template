import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "../../db"
import { notes } from "../../schema"

export async function updateNote(formData: FormData) {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  await db.update(notes).set({ title, content }).where(eq(notes.id, parseInt(id)))

  revalidatePath('/dashboard/notes')
}
