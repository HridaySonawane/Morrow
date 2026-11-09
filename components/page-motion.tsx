"use client";

import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const cardSelector = [
  ".feature-row",
  ".capability-card",
  ".team-card",
  ".team-coverage-row",
  ".principle-card",
  ".price-card",
  ".faq-item",
  ".rhythm-track-step",
  ".overview-metric",
  ".dashboard-task-row",
  ".dashboard-project-card",
  ".inbox-activity-row",
  ".calendar-day",
  ".report-project-table-row",
].join(", ");

const headingSelector = [
  ".manifesto-copy",
  ".section-heading-row",
  ".workflow-heading",
  ".pricing-heading",
  ".product-showcase-heading",
  ".capability-heading",
  ".teams-section-heading",
  ".about-principles-heading",
  ".faq-layout > div:first-child",
  ".dashboard-panel-heading",
].join(", ");

const visualSelector = [
  ".interior-product-stage",
  ".team-coverage-panel",
  ".product-proof-row",
  ".dashboard-insight-grid",
  ".reports-insight-grid",
  ".dashboard-overview-grid-linear",
  ".report-project-table",
].join(", ");

export function PageMotion() {
  const pathname = usePathname();

  useGSAP(() => {
    const main = document.querySelector<HTMLElement>("main");
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const nav = document.querySelector<HTMLElement>(".site-header .nav-shell");
      if (nav) gsap.from(nav, { autoAlpha: 0, y: -8, duration: 0.4, ease: "power2.out" });

      if (!main) return;

      const hero = main.querySelector<HTMLElement>(".dashboard-page-heading")
        ?? main.querySelector<HTMLElement>(".home-hero-copy")
        ?? main.querySelector<HTMLElement>(".product-hero")
        ?? main.querySelector<HTMLElement>(".teams-hero")
        ?? main.querySelector<HTMLElement>(".about-hero")
        ?? main.querySelector<HTMLElement>(".rhythm-hero")
        ?? main.querySelector<HTMLElement>(":scope > section:first-child")
        ?? main;
      const kicker = hero.querySelector<HTMLElement>(
        ".home-hero-overline, .product-kicker, .teams-hero-kicker, .about-hero-kicker, .rhythm-hero-index, .dashboard-eyebrow, .eyebrow, .product-aside-heading",
      ) ?? main.querySelector<HTMLElement>(".home-hero-overline");
      const title = hero.querySelector<HTMLElement>("h1, h2");
      const description = hero.querySelector<HTMLElement>(
        ".hero-description, .dashboard-page-heading p, .product-hero-copy > p, .about-hero-aside > p, .rhythm-hero-copy > p, .teams-hero-copy > p",
      );
      const actions = hero.querySelector<HTMLElement>(
        ".hero-actions, .product-hero-actions, .teams-hero-actions, .rhythm-hero-actions, .dashboard-page-heading button, .about-hero-link, .simple-cta-inner > .button",
      );
      const visual = hero.querySelector<HTMLElement>(
        ".hero-preview-wrap, .product-hero-aside, .team-coverage-panel, .rhythm-track, .about-hero-mark",
      ) ?? main.querySelector<HTMLElement>(".hero-preview-wrap, .interior-product-stage, .team-coverage-panel, .rhythm-track");

      const entrance = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (kicker) entrance.from(kicker, { autoAlpha: 0, y: 10, duration: 0.4 });
      if (title) entrance.from(title, { autoAlpha: 0, y: 22, duration: 0.65 }, kicker ? "-=0.16" : 0);
      if (description) entrance.from(description, { autoAlpha: 0, y: 14, duration: 0.5 }, "-=0.28");
      if (actions) entrance.from(actions, { autoAlpha: 0, y: 12, duration: 0.45 }, "-=0.2");
      if (visual) entrance.from(visual, { autoAlpha: 0, y: 18, duration: 0.6 }, "-=0.24");

      const blocks = new Set<HTMLElement>([
        ...gsap.utils.toArray<HTMLElement>("main > section:not(:first-child)", main),
        ...gsap.utils.toArray<HTMLElement>(".dashboard-content > *", main),
      ]);

      blocks.forEach((block) => {
        if (block.matches(".dashboard-page-heading")) return;
        const headings = block.querySelectorAll<HTMLElement>(headingSelector);
        const cards = block.querySelectorAll<HTMLElement>(cardSelector);
        const visuals = block.querySelectorAll<HTMLElement>(visualSelector);
        if (!headings.length && !cards.length && !visuals.length) {
          gsap.from(block, {
            autoAlpha: 0,
            y: 18,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: { trigger: block, start: "top 88%", once: true },
          });
          return;
        }

        const timeline = gsap.timeline({
          scrollTrigger: { trigger: block, start: "top 88%", once: true },
        });
        if (headings.length) {
          timeline.from(headings, { autoAlpha: 0, y: 16, duration: 0.5, stagger: 0.07, ease: "power2.out" });
        }
        if (cards.length) {
          timeline.from(cards, {
            autoAlpha: 0,
            y: 14,
            duration: 0.42,
            stagger: 0.055,
            ease: "power2.out",
          }, headings.length ? "-=0.18" : 0);
        }
        if (visuals.length) {
          timeline.from(visuals, {
            autoAlpha: 0,
            y: 12,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          }, headings.length || cards.length ? "-=0.16" : 0);
        }
      });

      const isCompact = window.matchMedia("(max-width: 760px)").matches;
      const parallaxRange = isCompact ? 72 : 132;
      const bindParallax = (
        target: HTMLElement | null,
        trigger: HTMLElement | null,
        from: gsap.TweenVars,
        to: gsap.TweenVars,
      ) => {
        if (!target || !trigger) return;
        gsap.fromTo(target, from, {
          ...to,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        });
      };

      // The outer stage and the screen travel at different rates to create depth.
      gsap.utils.toArray<HTMLElement>(".hero-preview-wrap, .interior-product-stage", main).forEach((scene) => {
        const screen = scene.querySelector<HTMLElement>(".monitor-stage");
        const frame = scene.querySelector<HTMLElement>(".product-frame");
        const trigger = scene.closest<HTMLElement>(".hero-section, .product-showcase-section") ?? scene;
        bindParallax(screen, trigger, { y: -parallaxRange * 0.7, scale: 0.96 }, { y: parallaxRange * 0.7, scale: 1.035 });
        bindParallax(frame, trigger, { y: parallaxRange * 0.35 }, { y: -parallaxRange * 0.35 });
      });

      // Keep the workflow panel and its mockup on separate planes.
      gsap.utils.toArray<HTMLElement>(".workflow-module", main).forEach((module) => {
        const trigger = module.closest<HTMLElement>(".workflow-section") ?? module;
        const visual = module.querySelector<HTMLElement>(".workflow-visual");
        bindParallax(module, trigger, { y: -parallaxRange * 0.48 }, { y: parallaxRange * 0.48 });
        bindParallax(
          visual,
          trigger,
          { y: parallaxRange * 0.32, x: isCompact ? -5 : -20, rotateY: isCompact ? -1 : -3 },
          { y: -parallaxRange * 0.32, x: isCompact ? 5 : 20, rotateY: isCompact ? 1 : 3 },
        );
      });

      const footer = document.querySelector<HTMLElement>(".site-footer");
      if (footer) {
        const links = footer.querySelectorAll<HTMLElement>(".footer-links > div, .back-top");
        if (links.length) {
          gsap.from(links, {
            autoAlpha: 0,
            y: 10,
            duration: 0.38,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: { trigger: footer, start: "top 92%", once: true },
          });
        }
      }

      ScrollTrigger.refresh();
    });

    return () => media.revert();
  }, { dependencies: [pathname], revertOnUpdate: true });

  return null;
}
