"use server";

import { afterLoginUrl } from "@/app-config";
import { rateLimitByIp } from "@/lib/limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { setSession } from "@/lib/session";
import { registerUserUseCase } from "@/use-cases/users";
import { redirect } from "next/navigation";
import { z } from "zod";

export const signUpAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      username: z.string().min(3),
      password: z.string().min(8),
    }),
  )
  .handler(async ({ input }) => {
    await rateLimitByIp({ key: "register", limit: 3, window: 30000 });
    const user = await registerUserUseCase(input.email, input.username, input.password);
    await setSession(user.id);
    return redirect(afterLoginUrl);
  });

export const signInAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      identifier: z.string(), // This can be either email or username
      password: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    await rateLimitByIp({ key: "signin", limit: 5, window: 60000 });
    const user = await authenticateUserUseCase(input.identifier, input.password);
    await setSession(user.id);
    return redirect(afterLoginUrl);
  });
