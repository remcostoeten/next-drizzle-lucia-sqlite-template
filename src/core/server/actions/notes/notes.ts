import { revalidatePath } from "next/cache"
import { notes } from "../../schema"

export async function createNote(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const folderId = formData.get('folderId') as string

  await db.insert(notes).values({
    title,
    content,
    userId: 'user-id', // Replace with actual user ID from authentication
    folderId,
  })

  revalidatePath('/dashboard/notes')
}
