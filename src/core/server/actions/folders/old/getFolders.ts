export async function getFolders(sessionId: string) {
  const { user, session } = await lucia.validateSession(sessionId);

  if (!session) {
    throw new Error("Unauthorized");
  }

  return await db.select().from(folders).where(eq(folders.userId, user.id));
}
