'use client'

import { createNote } from '@/core/server/actions/notes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function CreateNoteForm({ folders }) {
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(formData           : FormData) {
    setError('')
    try {
      await createNote(formData)
      router.refresh()
    } catch (e) {
      setError('Failed to create note. Please try again.')
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Note Title"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="content"
        placeholder="Note Content"
        className="w-full p-2 border rounded"
        rows={4}
        required
      />
      <select name="folderId" className="w-full p-2 border rounded" required>
        <option value="">Select Folder</option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Note
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
