import { Suspense } from "react";
import css from "./CatalogLayout.module.css";
import Container from "@/components/Container/Container";
import CamperFilters from "@/components/CamperFilters/CamperFilters";
import { fetchCamperFilters } from "@/lib/api/serverApi";

export const dynamic = "force-dynamic";

const CatalogLayout = async ({ children }: { children: React.ReactNode }) => {
  const filtersOptions = await fetchCamperFilters();

  return (
    <section className={css.section}>
      <Container>
        <div className={css.layout}>
          <aside className={css.sidebar}>
            <Suspense fallback={null}>
              <CamperFilters options={filtersOptions} />
            </Suspense>
          </aside>
          <div className={css.content}>{children}</div>
        </div>
      </Container>
    </section>
  );
};

export default CatalogLayout;
