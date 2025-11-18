import { mysqlTable, varchar, text, int, timestamp, boolean, primaryKey } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// --- Auth Schema (Better Auth) ---

export const users = mysqlTable("user", {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: text("name").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: boolean("emailVerified").notNull(),
    image: text("image"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
});

export const sessions = mysqlTable("session", {
    id: varchar("id", { length: 36 }).primaryKey(),
    expiresAt: timestamp("expiresAt").notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: varchar("userId", { length: 36 }).notNull().references(() => users.id),
});

export const accounts = mysqlTable("account", {
    id: varchar("id", { length: 36 }).primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: varchar("userId", { length: 36 }).notNull().references(() => users.id),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    expiresAt: timestamp("expiresAt"),
    password: text("password"),
});

export const verifications = mysqlTable("verification", {
    id: varchar("id", { length: 36 }).primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
});

// --- App Schema ---

export const folders = mysqlTable("folder", {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    color: varchar("color", { length: 50 }).default("blue"), // For UI
    userId: varchar("userId", { length: 36 }).notNull().references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const todos = mysqlTable("todo", {
    id: varchar("id", { length: 36 }).primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    completed: boolean("completed").default(false),
    dueDate: timestamp("due_date"),
    imageUrl: text("image_url"), // Cloudinary URL
    folderId: varchar("folderId", { length: 36 }).references(() => folders.id),
    userId: varchar("userId", { length: 36 }).notNull().references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const tags = mysqlTable("tag", {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    userId: varchar("userId", { length: 36 }).notNull().references(() => users.id),
});

export const todoTags = mysqlTable("todo_tag", {
    todoId: varchar("todoId", { length: 36 }).notNull().references(() => todos.id),
    tagId: varchar("tagId", { length: 36 }).notNull().references(() => tags.id),
}, (t) => ({
    pk: primaryKey({ columns: [t.todoId, t.tagId] }),
}));

export const shares = mysqlTable("share", {
    id: varchar("id", { length: 36 }).primaryKey(),
    todoId: varchar("todoId", { length: 36 }).notNull().references(() => todos.id),
    sharedWithEmail: varchar("shared_with_email", { length: 255 }).notNull(),
    permission: varchar("permission", { length: 20 }).default("view"), // view, edit
    createdAt: timestamp("created_at").defaultNow(),
});

// --- Relations ---

export const usersRelations = relations(users, ({ many }) => ({
    todos: many(todos),
    folders: many(folders),
    tags: many(tags),
}));

export const foldersRelations = relations(folders, ({ one, many }) => ({
    user: one(users, { fields: [folders.userId], references: [users.id] }),
    todos: many(todos),
}));

export const todosRelations = relations(todos, ({ one, many }) => ({
    user: one(users, { fields: [todos.userId], references: [users.id] }),
    folder: one(folders, { fields: [todos.folderId], references: [folders.id] }),
    tags: many(todoTags),
    shares: many(shares),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
    todos: many(todoTags),
}));

export const todoTagsRelations = relations(todoTags, ({ one }) => ({
    todo: one(todos, { fields: [todoTags.todoId], references: [todos.id] }),
    tag: one(tags, { fields: [todoTags.tagId], references: [tags.id] }),
}));
