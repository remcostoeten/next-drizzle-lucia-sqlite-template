import { db } from "@/db";
import { User, accounts, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { UserId } from "@/use-cases/types";
import { getAccountByUserId } from "@/data-access/accounts";
import { ITERATIONS } from "@/core/constants/token-length";

export async function deleteUser(userId: UserId) {
  await db.delete(users).where(eq(users.id, userId));
}

export async function getUser(userId: UserId) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  return user;
}

async function hashPassword(plainTextPassword: string, salt: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      plainTextPassword,
      salt,
      ITERATIONS,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString("hex"));
      },
    );
  });
}

export async function createUser(email: string) {
  const [user] = await db
    .insert(users)
    .values({
      email,
    })
    .returning();
  return user;
}

export async function verifyPassword(email: string, plainTextPassword: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    return false;
  }

  const account = await getAccountByUserId(user.id);

  if (!account) {
    return false;
  }

  const salt = account.salt;
  const savedPassword = account.password;

  if (!salt || !savedPassword) {
    return false;
  }

  const hash = await hashPassword(plainTextPassword, salt);
  return account.password == hash;
}

export async function getUserByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
}

export async function updateUser(userId: UserId, updatedUser: Partial<User>) {
  await db.update(users).set(updatedUser).where(eq(users.id, userId));
}
