"use server";

import { afterLoginUrl } from "@/app-config";
import { rateLimitByKey } from "@/lib/limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { setSession } from "@/lib/session";
import { signInUseCase } from "@/use-cases/users";
import { redirect } from "next/navigation";
import { z } from "zod";

export const signInAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      identifier: z.string().min(1, "Email or username is required"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      rememberMe: z.boolean().default(false),
    }),
  )
  .handler(async ({ input }) => {
    await rateLimitByKey({ key: input.identifier, limit: 3, window: 10000 });
    const user = await signInUseCase({ identifier: input.identifier, password: input.password });
    await setSession(user.id, input.rememberMe);
    redirect(afterLoginUrl);
  });
