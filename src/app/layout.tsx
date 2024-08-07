import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar/Navbar";

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
