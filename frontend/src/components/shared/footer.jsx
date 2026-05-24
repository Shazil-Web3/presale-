import Link from "next/link";
import { FaTwitter, FaDiscord, FaTelegramPlane, FaGithub } from "react-icons/fa";

export default function Footer() {
  const footerLinks = {
    product: [
      { label: "About", href: "/about" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Presale", href: "/#home" },
      { label: "Tokenomics", href: "/roadmap" },
      { label: "Roadmap", href: "/roadmap" },
    ],
    resources: [
      { label: "Whitepaper", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Security Audit", href: "#" },
      { label: "Brand Kit", href: "#" },
    ],
    community: [
      { label: "Twitter", href: "https://twitter.com", icon: FaTwitter },
      { label: "Discord", href: "https://discord.com", icon: FaDiscord },
      { label: "Telegram", href: "https://t.me", icon: FaTelegramPlane },
      { label: "GitHub", href: "https://github.com", icon: FaGithub },
    ],
  };

  return (
    <footer className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl md:grid-cols-4 lg:p-12">
        {/* Brand Section */}
        <div className="flex flex-col gap-6 md:col-span-1">
          <Link
            href="/"
            className="text-xl font-bold uppercase tracking-[0.25em] text-acid-lime"
          >
            BitRaxx
          </Link>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The next generation of decentralized finance. Advanced
            liquidity layers powered by the BRX token.
          </p>
          <div className="flex gap-4">
            {footerLinks.community.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/5 p-2.5 text-muted-foreground transition-all hover:bg-acid-lime hover:text-black"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Links Sections */}
        <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
              Product
            </h4>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-acid-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
              Resources
            </h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-acid-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition hover:text-acid-lime"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition hover:text-acid-lime"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground transition hover:text-acid-lime"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-4 text-xs text-muted-foreground backdrop-blur-xl sm:flex-row">
        <p>
          © 2026 BitRaxx Digital Asset Ecosystem. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-acid-lime animate-pulse" />
            Supply: 200,000,000 BRX
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Presale: $0.005
          </span>
        </div>
      </div>
    </footer>
  );
}
