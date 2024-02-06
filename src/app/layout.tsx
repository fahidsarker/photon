import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { languages } from "@/data/languages";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photon - IDE",
  description: `Photon is a simple online IDE for compiling and running code in various languages. It is a simple and easy to use online IDE for coding and compiling code in various languages. 
    ${languages.map((lang) => 'Online IDE for ' + lang.label).join(", ")}
  `,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
