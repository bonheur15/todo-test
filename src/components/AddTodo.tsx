"use client";

import React, { useState } from "react";
import { Plus, Image as ImageIcon, Calendar } from "lucide-react";

export function AddTodo() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Call server action
        console.log("Add todo:", title);
        setTitle("");
        setIsOpen(false);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="w-full py-3 px-4 flex items-center gap-3 text-gray-500 bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-xl transition-all"
            >
                <Plus size={20} />
                <span className="font-medium">Add a new task...</span>
            </button>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 animate-in fade-in zoom-in-95 duration-200">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full text-lg font-medium placeholder:text-gray-400 border-none outline-none bg-transparent"
                autoFocus
            />
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Calendar size={18} />
                    </button>
                    <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <ImageIcon size={18} />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!title.trim()}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </form>
    );
}
