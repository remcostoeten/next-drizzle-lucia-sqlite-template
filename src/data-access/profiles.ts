import { db } from "@/core/server/db";
import { profiles } from "@/core/server/schema";
import { eq } from "drizzle-orm/sql";
import { UserId } from "lucia";

type ProfileUpdateData = {
  username?: string;
  displayName?: string;
  bio?: string;
  image?: string | null;
}

export async function createProfile(
  userId: UserId,
  displayName: string,
  image?: string,
  bio?: string,
) {
  const [profile] = await db
    .insert(profiles)
    .values({
      userId,
      displayName,
      image,
      bio,
    })
    .onConflictDoNothing()
    .returning();
  return profile;
}
export async function updateProfile(userId: number, data: ProfileUpdateData) {
  await db.update(profiles)
    .set(data)
    .where(eq(profiles.userId, userId));
}

export async function getProfile(userId: UserId) {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });

  return profile;
}

export async function deleteProfile(userId: number) {
  await db.delete(profiles).where(eq(profiles.userId, userId));
}
