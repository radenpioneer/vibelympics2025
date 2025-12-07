import type { Metadata } from "next";
import { AppContainer } from "@/components/layout/AppContainer";
import "./globals.css";

export const metadata: Metadata = {
  title: "GALACTIC NETWORKS: PACKAGE AUDIT",
  description: "Imperial Security Bureau Package Ecosystem Auditor",
};

import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased min-h-screen text-foreground bg-background font-mono overflow-auto`}>
        <AppContainer>
          {children}
        </AppContainer>
      </body>
    </html>
  );
}
