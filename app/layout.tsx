import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./dashboard-visuals.css";
import { LiquidGlassFilter } from "@zakisheriff/liquid-glass";
import { RouteScrollReset } from "@/components/route-scroll-reset";

export const metadata: Metadata = {
  title: { default: "Morrow — Make room for your best work", template: "%s | Morrow" },
  description: "A thoughtful workspace for teams who want to move good work forward.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Azeret+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&f[]=sentient@400,401,500,501,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="morrow-professional">
        <LiquidGlassFilter>
          <RouteScrollReset />
          {children}
        </LiquidGlassFilter>
      </body>
    </html>
  );
}
