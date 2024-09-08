// src/app/dashboard/notes/folders/actions/delete-folder.ts
'use server'

import { db } from '@/core/server/db';
import { folders } from '@/core/server/schema';
import { lucia } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function deleteFolder(folderId: number) {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
        throw new Error('Unauthorized');
    }

    const { user } = await lucia.validateSession(sessionId);
    if (!user) {
        throw new Error('Unauthorized');
    }

    await db.delete(folders).where(eq(folders.id, folderId));

    revalidatePath('/dashboard/notes');
}
