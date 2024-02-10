import type { Metadata } from "next";
import { Inter, Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { languages } from "@/data/languages";

const inter = Inter({ subsets: ["latin"] });


const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--dfont-roboto-mono',
})
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  variable: '--dfont-poppins',
  subsets: ['latin'],
})

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
    <html lang="en" className={`${robotoMono.variable} ${poppins.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
