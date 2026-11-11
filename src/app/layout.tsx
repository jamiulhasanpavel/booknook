
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BookNook | A Small Online Library",
    template: "BookNook | %s",
  },
  description:
    "Discover, borrow, and enjoy your favorite books with BookNook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />

        <Toaster
          position="top-right"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
