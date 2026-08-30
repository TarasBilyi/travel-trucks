import { nextServer } from "./api";
import {
  Camper,
  CamperFiltersOptions,
  CamperReview,
  FetchCampersParams,
  FetchCampersResponse,
} from "@/types/camper";

export async function fetchCampers(
  params: FetchCampersParams,
): Promise<FetchCampersResponse> {
  const { page, perPage = 4, location, form, transmission, engine } = params;

  const { data } = await nextServer.get<FetchCampersResponse>("/campers", {
    params: {
      page,
      perPage,
      location: location || undefined,
      form: form || undefined,
      transmission: transmission || undefined,
      engine: engine || undefined,
    },
  });

  return data;
}

export async function fetchCamperFilters(): Promise<CamperFiltersOptions> {
  const { data } =
    await nextServer.get<CamperFiltersOptions>("/campers/filters");
  return data;
}

export async function fetchCamperById(id: string): Promise<Camper> {
  const { data } = await nextServer.get<Camper>(`/campers/${id}`);
  return data;
}

export async function fetchCamperReviews(
  id: string,
): Promise<CamperReview[]> {
  const { data } = await nextServer.get<CamperReview[]>(
    `/campers/${id}/reviews`,
  );
  return data;
}

export interface BookingPayload {
  camperId: string;
  name: string;
  email: string;
}

export interface BookingResponse {
  message: string;
}

export async function createBooking({
  camperId,
  name,
  email,
}: BookingPayload): Promise<BookingResponse> {
  const { data } = await nextServer.post<BookingResponse>(
    `/campers/${camperId}/booking-requests`,
    { name, email },
  );
  return data;
}
