import React from "react";
import Footer from "../_components/Footer";
import type { ReactNode } from "react";

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
