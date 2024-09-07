import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "../../db"
import { notes } from "../../schema"

export async function moveNote(formData: FormData) {
  const noteId = formData.get('noteId') as string
  const folderId = formData.get('folderId') as string

  await db.update(notes).set({ folderId }).where(eq(notes.id, parseInt(noteId)))

  revalidatePath('/dashboard/notes')
}
