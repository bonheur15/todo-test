"use client";

import React from "react";
import { Check, Trash2, Share2, Image as ImageIcon, Wand2 } from "lucide-react";
import { clsx } from "clsx";
import { format } from "date-fns";

interface TodoItemProps {
    todo: {
        id: string;
        title: string;
        description?: string | null;
        completed: boolean | null;
        dueDate?: Date | null;
        imageUrl?: string | null;
    };
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
    onShare?: (id: string) => void;
    onRewrite?: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onShare, onRewrite }: TodoItemProps) {
    return (
        <div
            className={clsx(
                "group flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200",
                todo.completed && "opacity-60 bg-gray-50"
            )}
        >
            <button
                onClick={() => onToggle(todo.id, !todo.completed)}
                className={clsx(
                    "mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                    todo.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-500 text-transparent"
                )}
            >
                <Check size={14} strokeWidth={3} />
            </button>

            <div className="flex-1 min-w-0">
                <h3
                    className={clsx(
                        "text-lg font-medium text-gray-900 transition-all",
                        todo.completed && "line-through text-gray-500"
                    )}
                >
                    {todo.title}
                </h3>
                {todo.description && (
                    <p className="mt-1 text-gray-600 text-sm line-clamp-2">{todo.description}</p>
                )}
                {todo.imageUrl && (
                    <div className="mt-3 relative rounded-lg overflow-hidden h-40 w-full max-w-md bg-gray-100">
                        <img
                            src={todo.imageUrl}
                            alt="Attachment"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                    {todo.dueDate && (
                        <span>{format(new Date(todo.dueDate), "MMM d, h:mm a")}</span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {onRewrite && (
                    <button
                        onClick={() => onRewrite(todo.id)}
                        className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Rewrite with AI"
                    >
                        <Wand2 size={18} />
                    </button>
                )}
                {onShare && (
                    <button
                        onClick={() => onShare(todo.id)}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Share"
                    >
                        <Share2 size={18} />
                    </button>
                )}
                <button
                    onClick={() => onDelete(todo.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}
