import { validateRequest } from "@/lib/session";

export async function UserSession() {
  const { user } = await validateRequest();
  return { user };
}
