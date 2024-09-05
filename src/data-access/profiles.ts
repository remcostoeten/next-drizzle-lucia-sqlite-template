import { db } from "@/core/server/db";
import { Profile, profiles } from "@/core/server/db/schema";
import { UserId } from "@/use-cases/types";
import { eq } from "drizzle-orm";

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
