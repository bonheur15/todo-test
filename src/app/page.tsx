import { AddTodo } from "@/components/AddTodo";
import { TodoItem } from "@/components/TodoItem";

export default function Home() {
  // Mock data for now
  const todos = [
    {
      id: "1",
      title: "Welcome to your new Todo App",
      description: "This is a sample task to show you how it looks.",
      completed: false,
      dueDate: new Date(),
    },
    {
      id: "2",
      title: "Completed task example",
      description: null,
      completed: true,
      dueDate: null,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-500 mt-1">Tuesday, November 19</p>
      </header>

      <div className="space-y-6">
        <AddTodo />

        <div className="space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => { }}
              onDelete={() => { }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
