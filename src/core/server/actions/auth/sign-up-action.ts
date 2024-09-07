'use server'

import { accounts, profiles, users } from "@/core/server/schema"
import { lucia } from "@/lib/auth"
import crypto from 'crypto'
import { db } from "db"
import { cookies } from 'next/headers'

interface SignUpData {
  email: string
  username: string
  password: string
}

function hashPassword(password: string): { hash: string, salt: string } {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return { hash, salt }
}

export async function signUp(data: SignUpData) {
  const { hash, salt } = hashPassword(data.password)

  try {
    const [newUser] = await db.insert(users).values({
      email: data.email,
      username: data.username,
    }).returning({ id: users.id });

    if (!newUser || !newUser.id) {
      throw new Error("Failed to create user");
    }

    await db.insert(accounts).values({
      userId: newUser.id,
      accountType: "email",
      password: hash,
      salt: salt,
    });

    await db.insert(profiles).values({
      userId: newUser.id,
      displayName: data.username,
    });

    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("UNIQUE constraint failed: app_user.email")) {
        return { error: "Email already in use" };
      }
      if (error.message.includes("UNIQUE constraint failed: app_user.username")) {
        return { error: "Username already taken" };
      }
    }
    console.error("Sign up error:", error);
    return { error: "An unexpected error occurred during sign up" };
  }
}
