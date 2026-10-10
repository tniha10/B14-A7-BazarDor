import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "বাজার দর - Bazar Dor",
  description: "Track and compare local market prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}