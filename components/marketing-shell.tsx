import type { ReactNode } from "react";
import { SiteHeader, ShortcutLauncher } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <ShortcutLauncher />
      {children}
      <SiteFooter />
    </>
  );
}
