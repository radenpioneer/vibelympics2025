import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GALACTIC NETWORKS: PACKAGE AUDIT",
  description: "Imperial Security Bureau Package Ecosystem Auditor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen relative overflow-hidden text-foreground bg-background font-mono">
        {/* CRT Effects */}
        <div className="fixed inset-0 z-50 pointer-events-none bg-[linear-gradient(to_bottom,rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] animate-flicker" />
        <div className="fixed top-0 left-0 z-51 w-full h-[2px] bg-[rgba(0,255,255,0.1)] pointer-events-none animate-scanline" />

        {/* Main Content Layer - High Z-index to sit above CRT effects if needed, or below if desired. 
            Usually elements need to be selectable, so z-index needs management. 
            The CSS for crt-overlay has pointer-events: none, so underneath is clickable.
        */}
        <main className="relative z-10 h-full w-full p-6 overflow-y-auto h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
