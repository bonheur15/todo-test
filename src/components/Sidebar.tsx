"use client";

import React from "react";
import Link from "next/link";
import { Folder, Home, Settings, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function Sidebar() {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/login");
    };

    return (
        <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col p-4">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Todo App</h1>
            </div>

            <nav className="flex-1 space-y-2">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Home size={20} />
                    <span>All Todos</span>
                </Link>

                <div className="pt-4">
                    <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Folders
                    </h3>
                    {/* TODO: Map through folders */}
                    <Link
                        href="/folder/work"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Folder size={20} className="text-blue-500" />
                        <span>Work</span>
                    </Link>
                    <Link
                        href="/folder/personal"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Folder size={20} className="text-green-500" />
                        <span>Personal</span>
                    </Link>
                </div>
            </nav>

            <div className="pt-4 border-t border-gray-200">
                {session ? (
                    <div className="flex items-center gap-3 px-4 py-2">
                        {session.user.image && (
                            <img
                                src={session.user.image}
                                alt={session.user.name}
                                className="w-8 h-8 rounded-full"
                            />
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {session.user.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {session.user.email}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="block px-4 py-2 text-center text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </aside>
    );
}
