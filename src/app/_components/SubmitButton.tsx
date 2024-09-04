"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type Props = {
  readyContent?: ReactNode;
  pendingContent?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function SubmitButton({
  readyContent = "Absenden",
  pendingContent = "Warten…",
  ...atts
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button className="button" type="submit" disabled={pending} {...atts}>
      {pending ? pendingContent : readyContent}
    </button>
  );
}
