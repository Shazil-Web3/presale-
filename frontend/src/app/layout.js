import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Web3Provider from "@/components/Web3Provider";
import ConditionalLayout from "@/components/shared/ConditionalLayout";
import SmoothScroll from "@/components/ui/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BitRaxx | Quantum Layer",
  description:
    "BitRaxx presale command center for BRX utility, allocation tracking, and investor operations.",
};

import { MouseProvider } from "@/context/MouseContext";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Web3Provider>
          <MouseProvider>
            <SmoothScroll>
              <ConditionalLayout>{children}</ConditionalLayout>
            </SmoothScroll>
          </MouseProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
