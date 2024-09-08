// src/app/dashboard/notes/folders/actions/edit-folder.ts
'use server'

import { db } from '@/core/server/db';
import { folders } from '@/core/server/schema';
import { lucia } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function editFolder(folderId: number, formData: FormData) {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
        throw new Error('Unauthorized');
    }

    const { user } = await lucia.validateSession(sessionId);
    if (!user) {
        throw new Error('Unauthorized');
    }

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const color = formData.get('color') as string;

    if (!name || !color) {
        throw new Error('Name and color are required');
    }

    await db.update(folders)
        .set({ name, description, color, updatedAt: new Date() })
        .where(eq(folders.id, folderId));

    revalidatePath('/dashboard/notes');
}
