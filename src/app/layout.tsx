import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Board } from "@/types";

const roboto = Roboto({ weight: ["700", "500", "400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knaban Board",
};

const boards: Board[] = [
  {
    id: "1",
    name: "Board 1",
  },
  {
    id: "2",
    name: "Board 2",
  },
  {
    id: "3",
    name: "Board 3",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-background-color text-font-primary-color flex`}>
        <Navbar boards={boards} /> {children}
      </body>
    </html>
  );
}
