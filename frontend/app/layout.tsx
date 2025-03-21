import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin X",
  description: "Admin panel generator by entity definition !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-background font-sans antialiase scroll-smooth	text-foreground	flex flex-col touch-none`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
