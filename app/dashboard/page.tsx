import type { Metadata } from "next";
import { DashboardApp } from "@/components/dashboard-app";
import { RouteScrollReset } from "@/components/route-scroll-reset";

export const metadata: Metadata = {
  title: "Workspace — Morrow",
  description: "Your work, projects, and team momentum in one considered workspace.",
};

export default function DashboardPage() {
  return <>
    <RouteScrollReset />
    <DashboardApp />
  </>;
}
