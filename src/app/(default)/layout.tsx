"use client";
import { AuthProvider } from "@/components/provider/AuthProvider";
import dynamic from "next/dynamic";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
const Navbar = dynamic(() => import("@/components/shared/Navbar/Navbar"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <main className="w-full">
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CookiesProvider>{children}</CookiesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </main>
  );
}
