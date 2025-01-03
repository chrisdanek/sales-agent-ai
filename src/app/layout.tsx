import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QPIK Product Agent",
  description: "My Product Agent application ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="icon" href="/favicon.webp" type="image/webp" />
      </head>
      <body className={`antialiased`}>
        <ThemeProvider>
          <Header />
          <main className="flex min-h-screen flex-1 flex-col overflow-y-auto overflow-x-hidden bg-secondary/20 px-8 py-24">
            {children}
          </main>
          <Toaster expand />
        </ThemeProvider>
      </body>
    </html>
  );
}
