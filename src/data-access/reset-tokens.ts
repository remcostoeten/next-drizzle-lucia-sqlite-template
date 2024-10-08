import { TOKEN_LENGTH, TOKEN_TTL } from "@/core/constants/token-length";
import { db } from "@/core/server/db";
import { resetTokens } from "@/core/server/schema";
import { generateRandomToken } from "@/data-access/utils";
import { eq } from "drizzle-orm";
import { UserId } from "lucia";

export async function createPasswordResetToken(userId: UserId) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

  await db.delete(resetTokens).where(eq(resetTokens.userId, userId));
  await db.insert(resetTokens).values({
    userId,
    token,
    tokenExpiresAt,
  });

  return token;
}

export async function getPasswordResetToken(token: string) {
  const existingToken = await db.query.resetTokens.findFirst({
    where: eq(resetTokens.token, token),
  });

  return existingToken;
}

export async function deletePasswordResetToken(token: string, trx = db) {
  await trx.delete(resetTokens).where(eq(resetTokens.token, token));
}
