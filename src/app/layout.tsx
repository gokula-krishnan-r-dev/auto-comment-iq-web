import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Sidebar from "@/components/shared/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"bg-custom-gray"}>
        <main className="flex h-screen">
          <Sidebar />
          {children}
        </main>
        <Toaster richColors />
      </body>
    </html>
  );
}
