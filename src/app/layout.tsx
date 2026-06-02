import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Simon J Cleary — Author & Storyteller",
  description: "Step into the private library of Simon J Cleary. Browse award-winning fiction, read exclusive excerpts, and join the members' circle for full access to every story.",
  keywords: ["Simon J Cleary", "author", "fiction", "books", "novels", "library", "stories"],
  authors: [{ name: "Simon J Cleary" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Simon J Cleary — Author & Storyteller",
    description: "Step into the private library of Simon J Cleary. Browse award-winning fiction, read exclusive excerpts, and join the members' circle.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${lora.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
