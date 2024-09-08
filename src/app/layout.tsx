
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";
import "../styles/app.scss";

import { Toaster } from "react-hot-toast";
import Providers from "../components/theme/providers";

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
          "min-h-screen bg-bg-body antialiased",
          geistSans.variable + " " + geistMono.variable,
        )}
      >
        <Providers>
          <NextTopLoader showSpinner={false} />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
