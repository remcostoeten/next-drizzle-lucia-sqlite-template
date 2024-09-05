"use server";

import { rateLimitByIp } from "@/lib/limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { changePasswordUseCase } from "@/use-cases/users";
import { z } from "zod";
/**
 * @deprecated This function is currently not used in the project.
 * as sending e-mails do not work in the current project. 
*/
export const changePasswordAction = unauthenticatedAction
    .createServerAction()
    .input(
        z.object({
            token: z.string(),
            password: z.string().min(8),
        }),
    )
    .handler(async ({ input: { token, password } }) => {
        await rateLimitByIp({ key: "change-password", limit: 2, window: 30000 });
        await changePasswordUseCase(token, password);
    });
