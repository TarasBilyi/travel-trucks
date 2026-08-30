"use client";

import { useRouter } from "next/navigation";
import css from "./EmptyState.module.css";
import { IconClose } from "@/components/Icons/Icons";

const EmptyState = () => {
  const router = useRouter();

  return (
    <div className={css.wrapper}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={css.illustration}
        src="/no-campers.png"
        alt=""
        aria-hidden="true"
      />

      <h3 className={css.title}>No campers found</h3>
      <p className={css.subtitle}>
        We couldn&apos;t find any campers that match your filters.
        <br />
        Try adjusting your search or clearing some filters.
      </p>

      <div className={css.actions}>
        <button
          className={css.clear}
          type="button"
          onClick={() => router.push("/catalog")}
        >
          <IconClose size={24} />
          Clear filters
        </button>
        <button
          className={css.viewAll}
          type="button"
          onClick={() => router.push("/catalog")}
        >
          View all campers
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
