"use client"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/75">© {new Date().getFullYear()} NeoLiv. All rights reserved.</p>
          <div className="flex items-center gap-4" aria-label="Social links">
            <a
              href="https://www.linkedin.com"
              aria-label="LinkedIn"
              className="text-foreground/80 hover:text-accent transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zM8 8h3.8v2.2h.05c.53-1 1.82-2.2 3.75-2.2C19.4 8 20 11 20 14.7V24h-4v-8.2c0-2-.04-4.6-2.8-4.6-2.8 0-3.2 2.2-3.2 4.5V24H6V8h2z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter/X"
              className="text-foreground/80 hover:text-accent transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.59l-5.16-6.11L4.7 22H1.44l8.02-9.16L1 2h6.75l4.66 5.44L18.244 2zm-2.31 18h2.07L8.14 4H6.01l9.924 16z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
