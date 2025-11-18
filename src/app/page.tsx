import { AddTodo } from "@/components/AddTodo";
import { TodoItem } from "@/components/TodoItem";
import { db } from "@/db";
import { todos } from "@/db/schema";
import { desc } from "drizzle-orm";
import { toggleTodo, deleteTodo, rewriteTodo, shareTodo } from "./actions";

export default async function Home() {
  const allTodos = await db.select().from(todos).orderBy(desc(todos.createdAt));

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-500 mt-1">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
      </header>

      <div className="space-y-6">
        <AddTodo />

        <div className="space-y-3">
          {allTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onRewrite={rewriteTodo}
              onShare={shareTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
