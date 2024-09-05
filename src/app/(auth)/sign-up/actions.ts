"use server";

import { afterLoginUrl } from "@/app-config";
import { rateLimitByKey } from "@/lib/limiter";
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
    await rateLimitByKey({ key: input.email, limit: 3, window: 10000 });
    const user = await registerUserUseCase(input.email, input.username, input.password);
    await setSession(user.id);
    redirect('/onboarding');
  });
