import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Todo App",
  description: "A beautiful, feature-rich todo application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-white">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-white">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
