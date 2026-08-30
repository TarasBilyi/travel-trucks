import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isAxiosError } from "axios";
import Container from "@/components/Container/Container";
import CamperDetailsClient from "./CamperDetailsClient";
import { fetchCamperById, fetchCamperReviews } from "@/lib/api/serverApi";

type Props = {
  params: Promise<{ camperId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { camperId } = await params;

  try {
    const camper = await fetchCamperById(camperId);
    return {
      title: `${camper.name} - Travel Trucks`,
      description: camper.description,
    };
  } catch {
    return {
      title: "Camper - Travel Trucks",
    };
  }
}

async function getCamperData(camperId: string) {
  try {
    // Reviews live on a separate endpoint (GET /campers/{camperId}/reviews),
    // fetch both in parallel.
    const [camper, reviews] = await Promise.all([
      fetchCamperById(camperId),
      fetchCamperReviews(camperId),
    ]);
    return { camper, reviews };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }
    throw error;
  }
}

const CamperDetailsPage = async ({ params }: Props) => {
  const { camperId } = await params;
  const { camper, reviews } = await getCamperData(camperId);

  return (
    <Container>
      <CamperDetailsClient camper={camper} reviews={reviews} />
    </Container>
  );
};

export default CamperDetailsPage;
