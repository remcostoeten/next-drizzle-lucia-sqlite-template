import { users } from "@/core/server/schema";
import { db } from "db";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "../session";

export async function getUserData() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return null;
    }

    const userData = await db.query.users.findFirst({
        where: eq(users.id, currentUser.id),
        columns: {
            id: true,
            username: true,
            email: true,
        },
    });

    return userData;
}
