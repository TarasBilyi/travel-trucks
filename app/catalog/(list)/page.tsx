import type { Metadata } from "next";
import css from "./CatalogPage.module.css";
import CatalogClient from "./CatalogClient";
import { CampersFilters } from "@/types/camper";

export const metadata: Metadata = {
  title: "Catalog - Travel Trucks",
  description: "Browse and filter campers available for rent.",
};

type Props = {
  searchParams: Promise<{
    location?: string;
    form?: string;
    transmission?: string;
    engine?: string;
  }>;
};

const CatalogPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const filters: CampersFilters = {
    location: params.location || undefined,
    form: params.form || undefined,
    transmission: params.transmission || undefined,
    engine: params.engine || undefined,
  };

  return (
    <div className={css.catalog}>
      <CatalogClient filters={filters} />
    </div>
  );
};

export default CatalogPage;
