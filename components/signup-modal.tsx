"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Check, Sparkles, X } from "lucide-react";

gsap.registerPlugin(useGSAP);

export function SignupModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    if (!open) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (submitted) {
        gsap.fromTo(".success-state", { autoAlpha: 0, y: 10 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        });
        return;
      }

      gsap.fromTo(".modal-backdrop", { autoAlpha: 0 }, {
        autoAlpha: 1,
        duration: 0.18,
        ease: "power1.out",
      });
      gsap.fromTo(".signup-modal", { autoAlpha: 0, y: 14, scale: 0.985 }, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.32,
        ease: "power3.out",
      });
    });
    return () => media.revert();
  }, { scope: backdropRef, dependencies: [open, submitted], revertOnUpdate: true });

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setEmail("");
      previouslyFocused.current?.focus();
      return;
    }

    previouslyFocused.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = window.requestAnimationFrame(() => emailRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <div ref={backdropRef} className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={dialogRef} className="signup-modal" role="dialog" aria-modal="true" aria-labelledby="signup-heading" tabIndex={-1}>
        <button className="modal-close icon-button" type="button" onClick={onClose} aria-label="Close dialog"><X size={18} /></button>
        <div className="modal-symbol"><Sparkles size={21} /></div>
        {submitted ? (
          <div className="success-state">
            <div className="success-icon"><Check size={22} /></div>
            <p className="eyebrow">YOU’RE ON THE LIST</p>
            <h2 id="signup-heading">A little more room<br />is coming your way.</h2>
            <p>We’ll reach out to <strong>{email}</strong> when your workspace is ready.</p>
            <button className="button button-primary button-full" type="button" onClick={onClose}>Sounds good <ArrowRight size={16} /></button>
          </div>
        ) : (
          <>
            <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
            <h2 id="signup-heading">Make room for<br />your best work.</h2>
            <p className="modal-description">Get early access to a workspace designed to keep your team in motion.</p>
            <form onSubmit={submit} className="signup-form">
              <label htmlFor="signup-email">Work email</label>
              <input ref={emailRef} id="signup-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" />
              <button className="button button-primary button-full" type="submit">Request early access <ArrowRight size={16} /></button>
            </form>
            <p className="modal-fineprint">No spam. Just a note when it’s your turn.</p>
          </>
        )}
      </section>
    </div>
  );
}
