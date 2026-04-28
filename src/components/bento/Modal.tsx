"use client";

import { ReactNode, useEffect, useRef } from "react";
import { X } from "lucide-react";

type ModalContent = { title: string; body: ReactNode };

type Props = {
  open: boolean;
  onClose: () => void;
  content: ModalContent | null;
};

export function Modal({ open, onClose, content }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    const root = dialogRef.current;
    const focusable = root?.querySelector<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open || !content) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-6 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bento-modal-title"
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-slate-800 p-8 ring-1 ring-slate-600 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-300"
        >
          <X className="h-5 w-5" />
        </button>
        <h3
          id="bento-modal-title"
          className="mb-4 font-mono text-xs uppercase tracking-widest text-teal-300"
        >
          {content.title}
        </h3>
        <div className="space-y-4 text-base leading-relaxed text-slate-100">
          {content.body}
        </div>
      </div>
    </div>
  );
}

export type { ModalContent };
