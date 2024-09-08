'use client'

import { createNote } from '@/core/server/actions/notes'
import { Button } from '@react-email/components'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Select, SelectContent, Textarea } from './ui'
import { ShadInput } from './ui/ShadInput'

export function CreateNoteForm({ folders }) {
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    setError('')
    try {
      await createNote(formData)
      router.refresh()
    } catch (e) {
      setError('Failed to create note. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ShadInput
        type="text"
        name="title"
        placeholder="Note Title"
        className="w-full p-2 border rounded"
        required
      />
      <Textarea
        name="content"
        placeholder="Note Content"
        rows={4}
        required
      />
      <Select name="folderId" required>
        <SelectContent>
          <option value="">Select Folder</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </SelectContent>
      </Select>
      <Button variant='outline' type="submit" >
        Create Note
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
