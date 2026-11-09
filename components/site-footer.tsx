import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container">
        <div className="footer-top">
          <div>
            <Link className="brand footer-brand" href="/" aria-label="Morrow home">
              <span className="brand-mark"><i /><i /><i /></span><span>morrow</span>
            </Link>
            <p>A clear place for<br />work that matters.</p>
          </div>
          <div className="footer-links">
            <div>
              <span>EXPLORE</span>
              <Link href="/product">Product</Link>
              <Link href="/how-it-works">How it works</Link>
              <Link href="/teams">For teams</Link>
              <Link href="/pricing">Pricing</Link>
            </div>
            <div>
              <span>THE DETAILS</span>
              <Link href="/about">Our approach</Link>
              <a href="mailto:hello@morrow.work">Contact</a>
              <a href="mailto:hello@morrow.work?subject=Morrow%20support">Help &amp; support</a>
            </div>
          </div>
          <Link className="back-top" href="/#top">Back to top <ArrowUpRight size={14} /></Link>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MORROW</span>
          <span>BUILT FOR TEAMS</span>
          <span>PROJECTS · PEOPLE · PROGRESS</span>
        </div>
      </div>
    </footer>
  );
}
