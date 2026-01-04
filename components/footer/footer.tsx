import { FooterMakerCTA } from "./footer-maker-cta";
import { FooterNav } from "./footer-nav";
import { FooterSocial } from "./footer-social";

export function Footer() {
  return (
    <footer className="w-full py-8 lg:py-16">
      <div>
        <FooterMakerCTA />
        <FooterNav />
      </div>
      <FooterSocial />


    </footer>
  );
}
