import Link from "next/link";
import { Globe, Send, PlayCircle, ArrowUpRight } from "lucide-react";
import { SHOW_DOCUMENTATION } from "@/lib/siteFlags";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-[1280px] mx-auto px-6 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6 cursor-pointer group w-fit">
              <img src="/brand-assets/png/full-logo-dark.png" alt="PilotUP Logo" className="h-8 w-auto object-contain" />
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-8">
              Build teams of AI Employees to scale your business. PilotUP automates complex tasks with autonomous AI agents that work 24/7.
            </p>

            <div className="flex items-center gap-4">
              {[
                { Icon: Globe, href: "https://www.instagram.com/thepilotup", label: "Instagram" },
                { Icon: Send, href: "https://www.linkedin.com/company/pilotup/", label: "LinkedIn" },
                { Icon: PlayCircle, href: "https://www.youtube.com/@thepilotup", label: "Youtube" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  <s.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Product</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How it Works</Link></li>
              <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/roles" className="hover:text-white transition-colors">Roles</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">AI Employees</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/functions/sales" className="hover:text-white transition-colors">Sales</Link></li>
              <li><Link href="/functions/marketing" className="hover:text-white transition-colors">Marketing</Link></li>
              <li><Link href="/functions/support" className="hover:text-white transition-colors">Support</Link></li>
              <li><Link href="/functions/research" className="hover:text-white transition-colors">Research</Link></li>
              <li><Link href="/functions/operations" className="hover:text-white transition-colors">Operations</Link></li>
              <li>
                <Link href="/functions" className="hover:text-white transition-colors flex items-center gap-1">
                  View All <ArrowUpRight className="w-3 h-3 opacity-50" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              {SHOW_DOCUMENTATION ? (
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              ) : null}
              <li><Link href="/changelog" className="hover:text-white transition-colors">Changelog</Link></li>
              <li><Link href="/feature-requests" className="hover:text-white transition-colors">Feature Requests</Link></li>
              <li>
                <a href="https://cal.com/nigeljacob/1-on-1" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  Talk to Founders <ArrowUpRight className="w-3 h-3 opacity-50" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Company & legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blogs</Link></li>
              <li><Link href="/brand-assets" className="hover:text-white transition-colors">Brand Assets</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-gray-500 text-xs">© {currentYear} PilotUP Inc. All rights reserved.</div>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <a href="mailto:hello@pilotup.io" className="hover:text-white transition-colors">hello@pilotup.io</a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center select-none pointer-events-none py-2">
        <span className="font-semibold tracking-[-0.03em] leading-none inline-block bg-gradient-to-b from-[#ffffff66] via-[#ffffff33] to-transparent bg-clip-text text-transparent text-[12vw] sm:text-[14vw] md:text-[12vw] lg:text-[11vw]">
          PilotUP.io
        </span>
      </div>
    </footer>
  );
}
