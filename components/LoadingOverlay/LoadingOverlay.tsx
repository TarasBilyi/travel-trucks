"use client";

import { createPortal } from "react-dom";
import css from "./LoadingOverlay.module.css";

const LoadingOverlay = () => {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className={css.backdrop} role="status" aria-live="polite">
      <div className={css.card}>
        <span className={css.spinner} />
        <p className={css.title}>Loading tracks...</p>
        <p className={css.subtitle}>
          Please wait while we fetch the best
          <br />
          travel trucks for you
        </p>
      </div>
    </div>,
    document.body,
  );
};

export default LoadingOverlay;
