import { db } from '@/core/server/db'
import { folders, notes } from '@/core/server/schema'
import { eq } from 'drizzle-orm'
import { Folder } from './components/Folder'
import { CreateFolderForm } from './components/CreateFolderForm'
import { CreateNoteForm } from './components/CreateNoteForm'
import { validateRequest } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function NotesPage() {
  const { user } = await validateRequest()
  if (!user) {
    redirect('/login')
  }

  const allFolders = await db.select().from(folders).where(eq(folders.userId, user.id))
  const allNotes = await db.select().from(notes).where(eq(notes.userId, user.id))

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-2">Folders</h2>
          {allFolders.map((folder) => (
            <Folder key={folder.id} folder={folder} notes={allNotes.filter(note => note.folderId === folder.id)} />
          ))}
          <CreateFolderForm />
        </div>
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-2">Create New Note</h2>
          <CreateNoteForm folders={allFolders} />
        </div>
      </div>
    </div>
  )
}
