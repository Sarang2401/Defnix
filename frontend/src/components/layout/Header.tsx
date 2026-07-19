"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { NavOverlay } from "./NavOverlay";

const navLinks = [
  { href: "/solutions",    label: "Solutions"    },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog",         label: "Blog"         },
  { href: "/about",        label: "About"        },
];

/* ── Animated soundwave ─────────────────────────────────── */
function SoundWave() {
  const h = [4,9,6,13,8,11,5,12,7,10,5,8];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:2, height:20, flexShrink:0 }} aria-hidden="true">
      {h.map((ht, i) => (
        <span key={i} style={{
          display:"inline-block", width:2.5, height:ht, borderRadius:1.5,
          backgroundColor:"color-mix(in srgb, var(--color-mist) 50%, transparent)",
          animation:`sw ${0.75+(i%5)*0.18}s ease-in-out ${i*0.07}s infinite alternate`,
        }}/>
      ))}
      <style>{`@keyframes sw{from{transform:scaleY(0.3);opacity:.2}to{transform:scaleY(1);opacity:.75}}`}</style>
    </span>
  );
}

/* ── Live clock ─────────────────────────────────────────── */
function formatClock() {
  const n = new Date(), h = n.getHours()%12||12;
  return `${h}:${String(n.getMinutes()).padStart(2,"0")} ${n.getHours()>=12?"PM":"AM"}`;
}

function subscribeToClock(callback: () => void) {
  const id = setInterval(callback, 10000);
  return () => clearInterval(id);
}

function getServerClockSnapshot() {
  return "";
}

function LiveClock() {
  const t = useSyncExternalStore(subscribeToClock, formatClock, getServerClockSnapshot);
  return (
    <span style={{
      fontFamily:"ui-monospace, 'SF Mono', monospace", fontSize:"0.72rem", fontWeight:600,
      letterSpacing:"0.05em", color:"color-mix(in srgb, var(--color-mist) 55%, transparent)",
      userSelect:"none", flexShrink:0,
    }}>{t}</span>
  );
}

/* ── Header ─────────────────────────────────────────────── */
export function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive:true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return ()=>{ document.body.style.overflow = ""; };
  }, [navOpen]);

  const pillBg = scrolled ? "color-mix(in srgb, var(--color-glass-deep) 98%, transparent)" : "color-mix(in srgb, var(--color-glass-deep) 92%, transparent)";

  return (
    <>
      <header className="header-bar" style={{
        position:"fixed", top:0, left:0, right:0, zIndex:50,
        padding:"14px 24px",
        display:"flex", alignItems:"flex-start", justifyContent:"center",
        pointerEvents:"none",
      }}>
        {/*
          position:relative on wrapper so the MENU tongue can be
          absolutely positioned flush against the pill's bottom edge.
        */}
        <div style={{ position:"relative", display:"inline-block", pointerEvents:"all" }}>

          {/* ── Main pill ───────────────────────────────── */}
          <nav style={{
            display:"inline-flex", alignItems:"stretch",
            backgroundColor: pillBg,
            border:"1px solid color-mix(in srgb, var(--color-pine) 32%, transparent)",
            borderRadius:14,
            backdropFilter:"blur(20px)",
            overflow:"hidden",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.4)"
              : "0 2px 16px rgba(0,0,0,0.22)",
            transition:"background-color 0.3s, box-shadow 0.3s",
          }}>

            {/* Logo — larger, transparent PNG naturally blends */}
            <Link href="/" className="header-logo-link" style={{
              display:"flex", alignItems:"center",
              padding:"6px 16px 6px 10px",
              borderRight:"1px solid color-mix(in srgb, var(--color-pine) 22%, transparent)",
              textDecoration:"none", flexShrink:0,
            }}>
              <div className="header-logo" style={{ position:"relative", width:160, height:54, flexShrink:0 }}>
                <Image
                  src="/logo-defnix.png"
                  alt="Defnix"
                  fill
                  sizes="(max-width: 480px) 120px, 160px"
                  style={{
                    objectFit:"contain",
                    objectPosition:"left center",
                    /*
                      invert(1) → white bg becomes black (invisible on dark pill)
                      The logo's dark-teal D and text become light/mist-toned.
                      hue-rotate(180deg) nudges inverted green-ish tones back
                      toward the original sage/mist palette.
                    */
                    filter:"invert(1) hue-rotate(180deg) saturate(0.75) brightness(1.05)",
                  }}
                  priority
                />
              </div>
            </Link>

            {/* Wave + clock — hidden on small screens to prevent pill overflow */}
            <div className="header-wave-clock" style={{
              display:"flex", alignItems:"center", gap:10,
              padding:"0 16px",
              borderRight:"1px solid color-mix(in srgb, var(--color-pine) 22%, transparent)",
              flexShrink:0,
            }}>
              <SoundWave />
              <LiveClock />
            </div>

            {/* Nav links — desktop only */}
            <div className="header-links" style={{ display:"flex", alignItems:"center" }}>
              {navLinks.map((link, i) => {
                const active = pathname===link.href||pathname.startsWith(link.href+"/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="header-nav-link"
                    data-active={active || undefined}
                    style={{
                      display:"inline-flex", alignItems:"center", position:"relative",
                      padding:"0 15px", height:"100%",
                      fontFamily:"var(--font-label)", fontSize:"0.65rem",
                      fontWeight: active ? 700 : 500,
                      letterSpacing:"0.11em", textTransform:"uppercase",
                      textDecoration:"none", whiteSpace:"nowrap",
                      borderRight: i<navLinks.length-1 ? "1px solid color-mix(in srgb, var(--color-pine) 14%, transparent)" : "none",
                    }}
                  >
                    {link.label}
                    {active && (
                      <span style={{
                        position:"absolute", bottom:7, left:"50%",
                        transform:"translateX(-50%)",
                        width:3, height:3, borderRadius:"50%",
                        backgroundColor:"var(--color-sage)",
                      }}/>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* LET'S TALK */}
            <Link href="/contact" className="header-cta-link" style={{
              display:"inline-flex", alignItems:"center",
              margin:"5px",
              color:"var(--color-glass-deep)",
              borderRadius:10, padding:"8px 22px",
              fontFamily:"var(--font-label)", fontSize:"0.65rem",
              fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase",
              textDecoration:"none", whiteSpace:"nowrap", flexShrink:0,
            }}
            >
              Let&apos;s Talk
            </Link>
          </nav>

          {/*
            ── MENU tongue — absolutely positioned flush against the
               pill's bottom-left, creating a seamless "tongue" effect.
               borderTop colour matches the pill bg → seam is invisible.
          */}
          <button
            onClick={() => setNavOpen(true)}
            aria-label="Open navigation menu"
            className="header-menu-tongue"
            style={{
              position:"absolute",
              top:"calc(100% - 1px)",   /* overlap pill bottom border by 1px */
              left:10,                   /* sits under the logo section */
              display:"inline-flex", alignItems:"center", gap:8,
              backgroundColor: pillBg,
              border:"1px solid color-mix(in srgb, var(--color-pine) 32%, transparent)",
              /* borderTop same colour as pill bg → looks like a seamless extension */
              borderTop:`1px solid ${scrolled ? "color-mix(in srgb, var(--color-glass-deep) 98%, transparent)" : "color-mix(in srgb, var(--color-glass-deep) 92%, transparent)"}`,
              borderRadius:"0 0 11px 11px",
              padding:"6px 22px 8px",
              cursor:"pointer",
              backdropFilter:"blur(20px)",
              zIndex:1,
            }}
          >
            <span style={{
              fontFamily:"var(--font-label)", fontSize:"0.6rem", fontWeight:700,
              letterSpacing:"0.16em", textTransform:"uppercase",
              color:"color-mix(in srgb, var(--color-mist) 55%, transparent)",
            }}>Menu</span>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
              <rect x="3.5" y="0" width="2" height="9" rx="1" fill="color-mix(in srgb, var(--color-mist) 40%, transparent)"/>
              <rect x="0" y="3.5" width="9" height="2" rx="1" fill="color-mix(in srgb, var(--color-mist) 40%, transparent)"/>
            </svg>
          </button>
        </div>
      </header>

      <style>{`
        @media(max-width:768px){
          .header-links{display:none!important}
        }
        @media(max-width:480px){
          .header-bar{padding:10px 12px!important}
          .header-wave-clock{display:none!important}
          .header-logo{width:120px!important}
          .header-logo-link{padding:6px 10px!important}
        }
      `}</style>

      <NavOverlay isOpen={navOpen} onClose={()=>setNavOpen(false)} />
    </>
  );
}
