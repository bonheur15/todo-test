"use server";

import { db } from "@/db";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth"; // Import auth to get session
import { headers } from "next/headers";

export async function createTodo(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    // const session = await auth.api.getSession({ headers: await headers() });

    // if (!session) {
    //   throw new Error("Unauthorized");
    // }

    // Mock user ID for now until auth is fully wired up with UI
    const userId = "user_123";

    await db.insert(todos).values({
        id: crypto.randomUUID(),
        title,
        description,
        userId: userId, // session.user.id
    });

    revalidatePath("/");
}

export async function toggleTodo(id: string, completed: boolean) {
    await db.update(todos).set({ completed }).where(eq(todos.id, id));
    revalidatePath("/");
}

export async function deleteTodo(id: string) {
    await db.delete(todos).where(eq(todos.id, id));
    revalidatePath("/");
}
