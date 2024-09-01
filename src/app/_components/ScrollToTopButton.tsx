"use client";

import { useEffect } from "react";
import { useState } from "react";
import { BiSolidToTop } from "react-icons/bi";

export default function ScrollToTopButton() {
  const isBrowser = () => typeof window !== "undefined";

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 250) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={isVisible ? "show" : ""}
      id="scroll-top-button"
      onClick={() => {
        if (isBrowser()) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      <BiSolidToTop />
    </div>
  );
}
