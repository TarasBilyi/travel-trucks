"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./CatalogPage.module.css";
import CamperCard from "@/components/CamperCard/CamperCard";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import EmptyState from "@/components/EmptyState/EmptyState";
import { fetchCampers } from "@/lib/api/clientApi";
import { CampersFilters, FetchCampersResponse } from "@/types/camper";

const PAGE_SIZE = 4;

interface CatalogClientProps {
  filters: CampersFilters;
}

const CatalogClient = ({ filters }: CatalogClientProps) => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam }) =>
      fetchCampers({ page: pageParam, perPage: PAGE_SIZE, ...filters }),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: FetchCampersResponse,
      allPages: FetchCampersResponse[],
    ) =>
      lastPage.page < lastPage.totalPages ? allPages.length + 1 : undefined,
  });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  return (
    <div className={css.results}>
      {isLoading && <LoadingOverlay />}

      {isError && !isLoading && (
        <p className={css.message}>
          Failed to load campers. Please try again later.
        </p>
      )}

      {!isLoading && !isError && campers.length === 0 && <EmptyState />}

      {campers.length > 0 && (
        <ul className={css.list}>
          {campers.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </ul>
      )}

      {hasNextPage && (
        <button
          className={css.loadMore}
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
};

export default CatalogClient;
