export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-0">
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-10">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-16">
          {/* Left: CTA heading */}
          <div className="max-w-sm">
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
              Let&apos;s build something exceptional.
            </h2>
            <p className="mt-4 text-sm text-white/40">Open to new opportunities</p>
          </div>

          {/* Right: email + links */}
          <div className="flex flex-col items-start md:items-end gap-8">
            <a
              href="mailto:antorneejnr@gmail.com"
              className="text-base font-medium text-white hover:text-white/70 transition-colors"
            >
              antorneejnr@gmail.com
            </a>
            <div className="text-right">
              <p className="text-xs tracking-widest text-white/40 uppercase mb-3">
                Relevant Links
              </p>
              <div className="flex flex-col items-end gap-2">
                {[
                  { label: "LinkedIn", href: "https://linkedin.com" },
                  { label: "Medium", href: "https://medium.com" },
                  { label: "Github", href: "https://github.com" },
                  { label: "Resume", href: "#" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-xs text-white/30 tracking-wide uppercase">
            2026 Emmanuel Anthony. All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
