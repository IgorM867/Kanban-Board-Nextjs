import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({ weight: ["700", "500", "400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knaban Board",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-background-color text-font-primary-color flex`}>
        <Navbar /> {children}
        <Toaster />
      </body>
    </html>
  );
}
