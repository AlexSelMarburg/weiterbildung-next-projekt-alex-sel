"use client";

import { useEffect, useRef } from "react";
import Logo from "./Logo";
import MainNavigation from "./MainNavigation";
import LogIn from "./LogIn";

export default function Header() {
  const navRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const toggleScrolled = () => {
      if (!navRef.current) return;
      const isSticky = window.scrollY > 0;
      navRef.current.classList.toggle("scrolled", isSticky);
    };

    window.addEventListener("scroll", toggleScrolled);

    return () => {
      window.removeEventListener("scroll", toggleScrolled);
    };
  }, []);

  return (
    <header className="main-header" ref={navRef}>
      <div className={`header-content`}>
        <div className="main-header__logo">
          <Logo />
          <LogIn />
        </div>
        <MainNavigation />
      </div>
    </header>
  );
}
