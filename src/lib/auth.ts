import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // Adjust path if needed
import * as schema from "@/db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "mysql",
        schema: schema,
    }),
    emailAndPassword: {
        enabled: true,
    },
    // Add other providers here if needed (e.g., Google, GitHub)
});
