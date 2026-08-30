"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../Container/Container";
import css from "./Header.module.css";

const Header = () => {
  const pathname = usePathname();
  const isCatalogActive = pathname === "/catalog" || pathname.startsWith("/catalog/");

  return (
    <header className={css.header}>
      <Container className={css.wrapper}>
        <Link href="/">
          <svg
            width="136"
            height="16"
            className={css.logo}
            aria-label="Logo"
            role="img"
          >
            <use href="/sprite.svg#logo"></use>
          </svg>
        </Link>
        <nav className={css.nav}>
          <ul className={css.list}>
            <li className={css.item}>
              <Link
                className={`${css.link} ${pathname === "/" ? css.active : ""}`}
                href="/"
              >
                Home
              </Link>
            </li>
            <li className={css.item}>
              <Link
                className={`${css.link} ${isCatalogActive ? css.active : ""}`}
                href="/catalog"
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
export default Header;
