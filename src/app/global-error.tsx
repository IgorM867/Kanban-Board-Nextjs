"use client";
import "./globals.css";
import { Roboto } from "next/font/google";
const roboto = Roboto({ weight: ["700", "500", "400"], subsets: ["latin"] });

function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} h-screen text-font-primary-color bg-background-color`}>
        <main className="flex h-full flex-col items-center justify-center ">
          <h2 className="text-center text-2xl">Something went wrong!</h2>
          <button
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
            onClick={() => {
              window.location.reload();
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
export default Error;
