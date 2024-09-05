import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";
import "../styles/app.scss";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/toaster";
import { Header } from "./_header/header";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Remco Stoeten's dashboard",
  icons: [
    { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon.ico" },
  ],
  keywords: "remco, stoeten, dashboard, file storage, notes, finances, tasks, todos, todos app, task app, task management, todo list, todo app, todo list app, todo list app",
  description: "A simple dashboard for Remco Stoeten",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          geistSans.variable + " " + geistMono.variable,
        )}
      >
        <Providers>
          <NextTopLoader showSpinner={false}  />
          <Header />
          <div className="container mx-auto w-full py-12">{children}</div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
