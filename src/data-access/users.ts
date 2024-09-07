           import { ITERATIONS } from "@/core/constants/token-length";
import { db } from "@/core/server/db";
import { users } from "@/core/server/schema";
import { getAccountByUserId } from "@/data-access/accounts";
import crypto from "crypto";
import { eq, or } from "drizzle-orm";
import { UserId } from "lucia";

export async function deleteUser(userId: number) {
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

export async function createUser(email: string, username: string) {
  const [user] = await db
    .insert(users)
    .values({
      email,
      username,
    })
    .returning();
  return user;
}

export async function verifyPassword(userId: UserId, plainTextPassword: string) {
  const account = await getAccountByUserId(userId);

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

export async function getUserByEmailOrUsername(identifier: string) {
  const user = await db.query.users.findFirst({
    where: or(eq(users.email, identifier), eq(users.username, identifier)),
  });

  return user;
}

export async function getUserByUsername(username: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  return user;
}

export async function updateUser(userId: UserId, updatedUser: Partial<User>) {
  await db.update(users).set(updatedUser).where(eq(users.id, userId));
}
