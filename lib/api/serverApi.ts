import { api } from "./api";
import { Camper, CamperReview } from "@/types/camper";

export async function fetchCamperById(id: string): Promise<Camper> {
  const { data } = await api.get<Camper>(`/campers/${id}`);
  return data;
}

export async function fetchCamperReviews(id: string): Promise<CamperReview[]> {
  const { data } = await api.get<CamperReview[]>(`/campers/${id}/reviews`);
  return data;
}
