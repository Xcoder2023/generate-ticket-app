// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/NavBar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "event ticket app",
  description: "Generates an event ticket",
  
  icons: {
    icon: "/images/logo2.svg",  
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo2.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#02191D]`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
