import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientProviders from "@/providers/ClientProviders";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Membly",
  description: "Membly Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 h-full`}
      >
        <ClientProviders>
          <div className="">
          {children}
          </div>
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  );
}
