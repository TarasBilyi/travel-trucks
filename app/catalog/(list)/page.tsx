import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  noop,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import css from "./CatalogPage.module.css";
import CatalogClient from "./CatalogClient";
import { fetchCampers } from "@/lib/api/serverApi";
import { CampersFilters, FetchCampersResponse } from "@/types/camper";

export const metadata: Metadata = {
  title: "Catalog - Travel Trucks",
  description: "Browse and filter campers available for rent.",
};

const PAGE_SIZE = 4;

type Props = {
  searchParams: Promise<{
    location?: string;
    form?: string;
    transmission?: string;
    engine?: string;
  }>;
};

function getNextPageParam(
  lastPage: FetchCampersResponse,
  allPages: FetchCampersResponse[],
) {
  return lastPage.page < lastPage.totalPages ? allPages.length + 1 : undefined;
}

const CatalogPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const filters: CampersFilters = {
    location: params.location || undefined,
    form: params.form || undefined,
    transmission: params.transmission || undefined,
    engine: params.engine || undefined,
  };

  const queryClient = new QueryClient();

  await queryClient
    .infiniteQuery({
      queryKey: ["campers", filters],
      queryFn: ({ pageParam }) =>
        fetchCampers({ page: pageParam, perPage: PAGE_SIZE, ...filters }),
      initialPageParam: 1,
      getNextPageParam,
    })
    .catch(noop);

  return (
    <div className={css.catalog}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CatalogClient filters={filters} />
      </HydrationBoundary>
    </div>
  );
};

export default CatalogPage;
