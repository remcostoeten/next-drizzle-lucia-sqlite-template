import { applicationName } from "@/app-config";
import { GitHubUser } from "@/app/api/login/github/callback/route";
import { GoogleUser } from "@/app/api/login/google/callback/route";
import { ResetPasswordEmail } from "@/core/config/emails/reset-password";
import {
  createAccount,
  createAccountViaGithub,
  createAccountViaGoogle,
  updatePassword,
} from "@/data-access/accounts";
import { createProfile, getProfile } from "@/data-access/profiles";
import {
  createPasswordResetToken,
  deletePasswordResetToken,
  getPasswordResetToken,
} from "@/data-access/reset-tokens";
import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserByEmailOrUsername,
  getUserByUsername,
  verifyPassword
} from "@/data-access/users";
import { createTransaction } from "@/data-access/utils";
import { generateRandomName } from "@/lib/names";
import {
  AuthenticationError,
  EmailInUseError,
  LoginError,
  NotFoundError,
  UsernameInUseError,
} from "./errors";
import { UserId, UserSession } from "./user";

export async function deleteUserUseCase(
  authenticatedUser: UserSession,
  userToDeleteId: UserId,
): Promise<void> {
  if (authenticatedUser.id !== userToDeleteId) {
    throw new AuthenticationError();
  }

  await deleteUser(userToDeleteId);
}

export async function getUserProfileUseCase(userId: UserId) {
  const profile = await getProfile(userId);

  if (!profile) {
    throw new NotFoundError();
  }

  return profile;
}

export async function registerUserUseCase(email: string, username: string, password: string) {
  const existingUserByEmail = await getUserByEmail(email);
  if (existingUserByEmail) {
    throw new EmailInUseError();
  }

  const existingUserByUsername = await getUserByUsername(username);
  if (existingUserByUsername) {
    throw new UsernameInUseError();
  }

  const user = await createUser(email, username);
  await createAccount(user.id, password);
  await createProfile(user.id, username);

  return { id: user.id };
}

export async function signInUseCase(input: { identifier: string; password: string }) {
  const user = await getUserByEmailOrUsername(input.identifier);

  if (!user) {
    throw new LoginError();
  }

  const isPasswordCorrect = await verifyPassword(user.id, input.password);

  if (!isPasswordCorrect) {
    throw new LoginError();
  }

  return { id: user.id };
}

export async function createGithubUserUseCase(githubUser: GitHubUser) {
  let existingUser = await getUserByEmail(githubUser.email);

  if (!existingUser) {
    existingUser = await createUser(githubUser.email, githubUser.login);
  }

  await createAccountViaGithub(existingUser.id, githubUser.id);

  await createProfile(existingUser.id, githubUser.login, githubUser.avatar_url);

  return existingUser.id;
}

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);

  if (!existingUser) {
    existingUser = await createUser(googleUser.email, generateRandomName());
  }

  await createAccountViaGoogle(existingUser.id, googleUser.sub);

  await createProfile(existingUser.id, googleUser.name, googleUser.picture);

  return existingUser.id;
}

export async function resetPasswordUseCase(email: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new AuthenticationError();
  }

  const token = await createPasswordResetToken(user.id);

  await sendEmail(
    email,
    `Your password reset link for ${applicationName}`,
    <ResetPasswordEmail token={token} />,
  );
}

export async function changePasswordUseCase(token: string, password: string) {
  const tokenEntry = await getPasswordResetToken(token);

  if (!tokenEntry) {
    throw new AuthenticationError();
  }

  const userId = tokenEntry.userId;

  await createTransaction(async (trx) => {
    await deletePasswordResetToken(token, trx);
    await updatePassword(userId, password, trx);
  });
}
