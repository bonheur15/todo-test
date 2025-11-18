"use server";

import { db } from "@/db";
import { todos, shares } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { rewriteTodoWithAI } from "@/lib/gemini";
import { sendEmail } from "@/lib/email";
import { uploadImage } from "@/lib/cloudinary";

export async function createTodo(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;

    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
        try {
            imageUrl = await uploadImage(imageFile);
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    }
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
        imageUrl,
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

export async function rewriteTodo(id: string) {
    const todo = await db.query.todos.findFirst({
        where: eq(todos.id, id),
    });

    if (!todo) return;

    try {
        const newTitle = await rewriteTodoWithAI(todo.title);
        await db.update(todos).set({ title: newTitle }).where(eq(todos.id, id));
        revalidatePath("/");
    } catch (error) {
        console.error("AI Rewrite failed:", error);
        // Handle error (e.g., return error state)
    }
}

export async function shareTodo(id: string, email: string) {
    const todo = await db.query.todos.findFirst({
        where: eq(todos.id, id),
    });

    if (!todo) return;

    await db.insert(shares).values({
        id: crypto.randomUUID(),
        todoId: id,
        sharedWithEmail: email,
        permission: "view",
    });

    await sendEmail(
        email,
        "Todo Shared with You",
        `<p>A todo item "<strong>${todo.title}</strong>" has been shared with you.</p>`
    );

    revalidatePath("/");
}
