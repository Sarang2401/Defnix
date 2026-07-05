"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: "/",             label: "Home"         },
  { href: "/solutions",    label: "Solutions"    },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog",         label: "Blog"         },
  { href: "/about",        label: "About Us"     },
  { href: "/contact",      label: "Contact"      },
];

export function NavOverlay({ isOpen, onClose }: NavOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="bd"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.22 }}
            onClick={onClose}
            style={{
              position:"fixed", inset:0, zIndex:60,
              backgroundColor:"rgba(18,28,34,0.78)",
              backdropFilter:"blur(6px)",
            }}
          />

          <motion.nav
            key="panel"
            initial={{ x:"-100%", opacity:0.5 }}
            animate={{ x:0, opacity:1 }}
            exit={{ x:"-100%", opacity:0 }}
            transition={{ type:"spring", damping:28, stiffness:255 }}
            style={{
              position:"fixed", top:0, left:0, bottom:0, zIndex:70,
              width:"min(360px,90vw)",
              backgroundColor:"#19272f",
              borderRight:"1px solid rgba(82,121,111,0.2)",
              display:"flex", flexDirection:"column",
            }}
          >
            {/* Top bar */}
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"14px 20px",
              borderBottom:"1px solid rgba(82,121,111,0.15)",
              backgroundColor:"#1e2c32",
            }}>
              <div style={{ position:"relative", width:110, height:36 }}>
                <Image
                  src="/logo-defnix.png"
                  alt="Defnix"
                  fill
                  style={{
                    objectFit:"contain",
                    objectPosition:"left center",
                    filter:"invert(1) hue-rotate(180deg) saturate(0.8) brightness(1.1)",
                  }}
                />
              </div>

              <Link href="/contact" onClick={onClose} style={{
                display:"inline-flex", alignItems:"center",
                backgroundColor:"#CAD2C5", color:"#19272f",
                borderRadius:8, padding:"7px 16px",
                fontFamily:"'Inter',sans-serif", fontSize:"0.62rem",
                fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase",
                textDecoration:"none", whiteSpace:"nowrap",
                transition:"background-color 0.18s ease",
              }}
              onMouseEnter={(e)=>(e.currentTarget.style.backgroundColor="#84A98C")}
              onMouseLeave={(e)=>(e.currentTarget.style.backgroundColor="#CAD2C5")}
              >
                Let&apos;s Talk
              </Link>
            </div>

            {/* Nav links */}
            <div style={{ flex:1, overflowY:"auto" }}>
              {navItems.map((item, i) => (
                <motion.div key={item.href}
                  initial={{ opacity:0, x:-18 }}
                  animate={{ opacity:1, x:0 }}
                  transition={{ delay:0.06+i*0.05, duration:0.26, ease:"easeOut" }}
                >
                  <Link href={item.href} onClick={onClose} style={{
                    display:"flex", alignItems:"center", gap:16,
                    padding:"18px 24px",
                    borderBottom:"1px solid rgba(82,121,111,0.1)",
                    textDecoration:"none",
                    transition:"background-color 0.15s ease",
                  }}
                  onMouseEnter={(e)=>{
                    e.currentTarget.style.backgroundColor="rgba(82,121,111,0.1)";
                    (e.currentTarget.querySelector(".a") as HTMLElement).style.color="#84A98C";
                    (e.currentTarget.querySelector(".l") as HTMLElement).style.color="#84A98C";
                  }}
                  onMouseLeave={(e)=>{
                    e.currentTarget.style.backgroundColor="transparent";
                    (e.currentTarget.querySelector(".a") as HTMLElement).style.color="rgba(202,210,197,0.22)";
                    (e.currentTarget.querySelector(".l") as HTMLElement).style.color="#CAD2C5";
                  }}
                  >
                    <span className="a" style={{ fontSize:"1.05rem", color:"rgba(202,210,197,0.22)", transition:"color 0.15s ease", lineHeight:1 }}>→</span>
                    <span className="l" style={{
                      fontFamily:"'Inter',sans-serif", fontSize:"0.7rem", fontWeight:700,
                      letterSpacing:"0.16em", textTransform:"uppercase",
                      color:"#CAD2C5", transition:"color 0.15s ease",
                    }}>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom bar */}
            <div style={{
              borderTop:"1px solid rgba(82,121,111,0.15)",
              padding:"14px 20px",
              display:"flex", alignItems:"center", justifyContent:"space-between",
              backgroundColor:"#1e2c32",
            }}>
              <span style={{
                fontFamily:"'Inter',sans-serif", fontSize:"0.56rem", fontWeight:500,
                letterSpacing:"0.14em", textTransform:"uppercase",
                color:"rgba(202,210,197,0.26)",
              }}>Bengaluru · India</span>

              <button onClick={onClose} style={{
                display:"inline-flex", alignItems:"center", gap:7,
                backgroundColor:"rgba(82,121,111,0.1)",
                border:"1px solid rgba(82,121,111,0.24)",
                borderRadius:999, padding:"6px 16px",
                fontFamily:"'Inter',sans-serif", fontSize:"0.6rem", fontWeight:700,
                letterSpacing:"0.14em", textTransform:"uppercase",
                color:"#CAD2C5", cursor:"pointer",
                transition:"background-color 0.18s ease",
              }}
              onMouseEnter={(e)=>(e.currentTarget.style.backgroundColor="rgba(82,121,111,0.22)")}
              onMouseLeave={(e)=>(e.currentTarget.style.backgroundColor="rgba(82,121,111,0.1)")}
              >
                Close ×
              </button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
