import { api } from "./api";
import {
  CamperFiltersOptions,
  FetchCampersParams,
  FetchCampersResponse,
} from "@/types/camper";

export async function fetchCampers(
  params: FetchCampersParams,
): Promise<FetchCampersResponse> {
  const { page, perPage = 4, location, form, transmission, engine } = params;

  const { data } = await api.get<FetchCampersResponse>("/campers", {
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
  const { data } = await api.get<CamperFiltersOptions>("/campers/filters");
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
  const { data } = await api.post<BookingResponse>(
    `/campers/${camperId}/booking-requests`,
    { name, email },
  );
  return data;
}
