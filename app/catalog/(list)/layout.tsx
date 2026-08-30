import { Suspense } from "react";
import css from "./CatalogLayout.module.css";
import Container from "@/components/Container/Container";
import CamperFilters from "@/components/CamperFilters/CamperFilters";

const CatalogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={css.section}>
      <Container>
        <div className={css.layout}>
          <aside className={css.sidebar}>
            <Suspense fallback={null}>
              <CamperFilters />
            </Suspense>
          </aside>
          <div className={css.content}>{children}</div>
        </div>
      </Container>
    </section>
  );
};

export default CatalogLayout;
