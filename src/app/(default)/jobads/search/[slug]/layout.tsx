"use client";
import { JobSearchProvider } from "@/components/provider/JobProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full">
      <JobSearchProvider>{children}</JobSearchProvider>
    </main>
  );
}
