"use client";

import { useState, useEffect } from "react";
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
          backgroundColor:"rgba(202,210,197,0.5)",
          animation:`sw ${0.75+(i%5)*0.18}s ease-in-out ${i*0.07}s infinite alternate`,
        }}/>
      ))}
      <style>{`@keyframes sw{from{transform:scaleY(0.3);opacity:.2}to{transform:scaleY(1);opacity:.75}}`}</style>
    </span>
  );
}

/* ── Live clock ─────────────────────────────────────────── */
function LiveClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () => {
      const n = new Date(), h = n.getHours()%12||12;
      return `${h}:${String(n.getMinutes()).padStart(2,"0")} ${n.getHours()>=12?"PM":"AM"}`;
    };
    setT(fmt());
    const id = setInterval(()=>setT(fmt()), 10000);
    return ()=>clearInterval(id);
  }, []);
  return (
    <span style={{
      fontFamily:"'Inter',monospace", fontSize:"0.72rem", fontWeight:600,
      letterSpacing:"0.05em", color:"rgba(202,210,197,0.55)",
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

  const pillBg = scrolled ? "rgba(24,38,46,0.98)" : "rgba(24,38,46,0.92)";

  return (
    <>
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:50,
        padding:"14px 24px",
        display:"flex", alignItems:"flex-start", justifyContent:"center",
        pointerEvents:"none",
      }}>
        {/*
          Wrapper: relative so MENU tab can be absolutely positioned
          below the left edge of the pill
        */}
        <div style={{ position:"relative", display:"inline-flex", flexDirection:"column", alignItems:"flex-start", pointerEvents:"all" }}>

          {/* ── Main pill ───────────────────────────────── */}
          <nav style={{
            display:"inline-flex", alignItems:"stretch",
            backgroundColor: pillBg,
            border:"1px solid rgba(82,121,111,0.32)",
            borderRadius:14,
            backdropFilter:"blur(20px)",
            overflow:"hidden",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.4)"
              : "0 2px 16px rgba(0,0,0,0.22)",
            transition:"background-color 0.3s, box-shadow 0.3s",
          }}>

            {/* Logo — larger, transparent PNG naturally blends */}
            <Link href="/" style={{
              display:"flex", alignItems:"center",
              padding:"6px 16px 6px 10px",
              borderRight:"1px solid rgba(82,121,111,0.22)",
              textDecoration:"none", flexShrink:0,
            }}>
              <div style={{ position:"relative", width:120, height:40, flexShrink:0 }}>
                <Image
                  src="/logo-defnix.png"
                  alt="Defnix"
                  fill
                  sizes="120px"
                  style={{
                    objectFit:"contain",
                    objectPosition:"left center",
                    /*
                      mix-blend-mode:lighten: on a DARK bg, white pixels
                      from the logo become the lighter of (white, dark-bg) = white.
                      mix-blend-mode:screen: white stays white (bad).
                      mix-blend-mode:multiply: white×dark = dark (white disappears ✓).
                      BUT multiply darkens color pixels too.
                      
                      Best for white-bg logo on dark surface:
                      Invert the whole image, then screen blend.
                      filter: invert(1) makes black bg, colors invert → then screen on dark = visible
                    */
                    filter:"invert(1) hue-rotate(180deg) saturate(0.8) brightness(1.1)",
                  }}
                  priority
                />
              </div>
            </Link>

            {/* Wave + clock */}
            <div style={{
              display:"flex", alignItems:"center", gap:10,
              padding:"0 16px",
              borderRight:"1px solid rgba(82,121,111,0.22)",
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
                  <Link key={link.href} href={link.href} style={{
                    display:"inline-flex", alignItems:"center", position:"relative",
                    padding:"0 15px", height:"100%",
                    fontFamily:"'Inter',sans-serif", fontSize:"0.65rem",
                    fontWeight: active ? 700 : 500,
                    letterSpacing:"0.11em", textTransform:"uppercase",
                    color: active ? "#CAD2C5" : "rgba(202,210,197,0.48)",
                    textDecoration:"none", whiteSpace:"nowrap",
                    borderRight: i<navLinks.length-1 ? "1px solid rgba(82,121,111,0.14)" : "none",
                    transition:"color 0.16s",
                  }}
                  onMouseEnter={e=>(e.currentTarget.style.color="#CAD2C5")}
                  onMouseLeave={e=>(e.currentTarget.style.color=active?"#CAD2C5":"rgba(202,210,197,0.48)")}
                  >
                    {link.label}
                    {active && (
                      <span style={{
                        position:"absolute", bottom:7, left:"50%",
                        transform:"translateX(-50%)",
                        width:3, height:3, borderRadius:"50%",
                        backgroundColor:"#84A98C",
                      }}/>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* LET'S TALK */}
            <Link href="/contact" style={{
              display:"inline-flex", alignItems:"center",
              margin:"5px",
              backgroundColor:"#CAD2C5", color:"#18262e",
              borderRadius:10, padding:"8px 22px",
              fontFamily:"'Inter',sans-serif", fontSize:"0.65rem",
              fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase",
              textDecoration:"none", whiteSpace:"nowrap", flexShrink:0,
              transition:"background-color 0.18s",
            }}
            onMouseEnter={e=>(e.currentTarget.style.backgroundColor="#84A98C")}
            onMouseLeave={e=>(e.currentTarget.style.backgroundColor="#CAD2C5")}
            >
              Let&apos;s Talk
            </Link>
          </nav>

          {/*
            ── MENU drop-tab — sits BELOW the pill, attached under
               the logo+clock section. Matches the reference exactly.
          ──────────────────────────────────────────────────────── */}
          <button
            onClick={() => setNavOpen(true)}
            aria-label="Open navigation menu"
            style={{
              display:"inline-flex", alignItems:"center", gap:8,
              /* Position: below the pill's left section */
              marginTop:2,
              backgroundColor: pillBg,
              border:"1px solid rgba(82,121,111,0.32)",
              /* Flat top so it looks connected to pill above */
              borderRadius:"0 0 10px 10px",
              borderTop:"none",
              padding:"6px 20px 7px",
              cursor:"pointer",
              transition:"background-color 0.18s",
              backdropFilter:"blur(20px)",
            }}
            onMouseEnter={e=>(e.currentTarget.style.backgroundColor="rgba(82,121,111,0.18)")}
            onMouseLeave={e=>(e.currentTarget.style.backgroundColor=pillBg)}
          >
            <span style={{
              fontFamily:"'Inter',sans-serif", fontSize:"0.62rem", fontWeight:700,
              letterSpacing:"0.15em", textTransform:"uppercase",
              color:"rgba(202,210,197,0.6)",
            }}>Menu</span>
            {/* + icon */}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <rect x="4" y="0" width="2" height="10" rx="1" fill="rgba(202,210,197,0.45)"/>
              <rect x="0" y="4" width="10" height="2" rx="1" fill="rgba(202,210,197,0.45)"/>
            </svg>
          </button>
        </div>
      </header>

      <style>{`@media(max-width:768px){.header-links{display:none!important}}`}</style>

      <NavOverlay isOpen={navOpen} onClose={()=>setNavOpen(false)} />
    </>
  );
}
