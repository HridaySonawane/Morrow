"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * The App Router may preserve the previous scroll position during soft
 * navigation when the incoming page is considered visible. Morrow uses a
 * sticky header and long marketing pages, so explicitly start each new route
 * at the top while leaving same-page hash links free to scroll to their target.
 */
export function RouteScrollReset() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    // Preserve intentional deep links such as /product#integrations.
    if (window.location.hash) return;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    // Override the global smooth-scroll rule for route changes so the new
    // page is placed at the top immediately, without a visible scroll sweep.
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    const frame = window.requestAnimationFrame(() => {
      root.style.scrollBehavior = previousScrollBehavior;
    });

    return () => {
      window.cancelAnimationFrame(frame);
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [pathname]);

  return null;
}
