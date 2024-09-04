"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
