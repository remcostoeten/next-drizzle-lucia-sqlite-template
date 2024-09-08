import { lucia } from "@/lib/auth";

export async function createFolder(formData: FormData, sessionId: string) {
  const name = formData.get('folderName') as string;
  const { user, session } = await lucia.validateSession(sessionId);

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!name) {
    throw new Error("Folder name is required");
  }
}
