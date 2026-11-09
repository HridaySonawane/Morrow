"use client";

import { useState, type ReactNode } from "react";
import { SignupModal } from "./signup-modal";

export function SignupTrigger({ children, className = "button button-primary" }: { children: ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);
  return <><button type="button" className={className} onClick={() => setOpen(true)}>{children}</button><SignupModal open={open} onClose={() => setOpen(false)} /></>;
}
