"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#hero", label: "NEOLIV GROUP" },
  { href: "#trading", label: "NEOLIV PROJECTS" },
  { href: "#capital", label: "NEOLIV PILLARS" },
  { href: "#maritime", label: "NEOLIV VALUES" },
  { href: "#energy", label: "NEOLIV TEAM" },
  { href: "#maritime", label: "ESG" },
  { href: "#energy", label: "NEOLIV CAPITAL ADVISORY" },
  { href: "#maritime", label: "..." },
];

export default function Navbar() {
  const [active, setActive] = useState<string>("#hero");
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-35% 0px -45% 0px" }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Hide/show on scroll
  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
    }
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <header
  className={`sticky top-12 z-50 bg-transparent transition-transform duration-300 ${
    show ? "translate-y-0" : "-translate-y-[calc(100%+3rem)]"
  }`}
>
      <div className="container mx-auto px-6">
        <nav className="flex justify-center gap-10 py-6 text-sm font-medium">
          {links.map((l) => {
            const isActive = active === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => onNavClick(e, l.href)}
                className={`relative transition-colors duration-300 ${
                  isActive
                    ? "text-blue-900 font-bold"
                    : "text-blue-900 hover:text-blue-900"
                }`}
              >
                {l.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full bg-blue-900 transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
