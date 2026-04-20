export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 md:pt-20 pb-10">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 md:gap-12 mb-16 text-center md:text-left">
          {/* Left: CTA heading */}
          <div className="max-w-sm mx-auto md:mx-0">
            <h2 className="text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight">
              Let&apos;s build something exceptional.
            </h2>
            <p className="mt-4 text-sm text-white/40">Open to new opportunities</p>
          </div>

          {/* Right: email + links */}
          <div className="flex flex-col items-center md:items-end gap-8">
            <a
              href="mailto:antorneejnr@gmail.com"
              className="text-base font-bold underline underline-offset-2 text-white hover:text-white/70 transition-colors"
            >
              antorneejnr@gmail.com
            </a>
            <div className="text-center md:text-right">
              <p className="text-xs tracking-widest text-white/40 uppercase mb-3">
                Relevant Links
              </p>
              <div className="flex flex-col items-center md:items-end gap-2">
                <a
                  href="https://www.linkedin.com/in/emmanuel-anthony-639b07122/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://medium.com/me/stories?tab=posts-published"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Medium
                </a>
                <a
                  href="https://github.com/anthony-emmauel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Github
                </a>
                <a
                  href="/resume/Emmanuel Anthony CVpdf.pdf"
                  download="Emmanuel-Anthony-Resume.pdf"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 text-center md:text-left">
          <p className="text-xs text-white/30 tracking-wide uppercase">
            2026 Emmanuel Anthony. All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
