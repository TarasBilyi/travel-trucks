import css from "./CamperDetails.module.css";
import RatingStars from "@/components/RatingStars/RatingStars";
import CamperGallery from "@/components/CamperGallery/CamperGallery";
import CamperReviews from "@/components/CamperReviews/CamperReviews";
import BookingForm from "@/components/BookingForm/BookingForm";
import { IconLocation } from "@/components/Icons/Icons";
import { humanize } from "@/lib/format";
import { Camper, CamperReview } from "@/types/camper";

interface CamperDetailsClientProps {
  camper: Camper;
  reviews: CamperReview[];
}

const CamperDetailsClient = ({ camper, reviews }: CamperDetailsClientProps) => {
  const equipment = [
    humanize(camper.transmission),
    humanize(camper.engine),
    ...camper.amenities.map(humanize),
  ];

  const details = [
    { label: "Form", value: humanize(camper.form) },
    { label: "Length", value: camper.length },
    { label: "Width", value: camper.width },
    { label: "Height", value: camper.height },
    { label: "Tank", value: camper.tank },
    { label: "Consumption", value: camper.consumption },
  ];

  return (
    <div className={css.page}>
      <div className={css.hero}>
        <CamperGallery images={camper.gallery} name={camper.name} />

        <div className={css.info}>
          <div className={css.headerCard}>
            <div>
              <h1 className={css.name}>{camper.name}</h1>

              <div className={css.metaRow}>
                <span className={css.rating}>
                  <RatingStars rating={camper.rating} />
                  {camper.rating.toFixed(1)}({camper.totalReviews} Reviews)
                </span>
                <span className={css.location}>
                  <IconLocation size={16} />
                  {camper.location}
                </span>
              </div>

              <p className={css.price}>&euro;{camper.price.toFixed(0)}</p>
            </div>

            <p className={css.description}>{camper.description}</p>
          </div>

          <div className={css.vehicleDetails}>
            <h2 className={css.sectionTitle}>Vehicle details</h2>

            <ul className={css.equipmentList}>
              {equipment.map((item) => (
                <li key={item} className={css.equipmentItem}>
                  {item}
                </li>
              ))}
            </ul>

            <hr className={css.divider} />

            <ul className={css.detailsList}>
              {details.map((detail) => (
                <li key={detail.label} className={css.detailsItem}>
                  <span>{detail.label}</span>
                  <span>{detail.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={css.bottom}>
        <div className={css.reviews}>
          <h2 className={css.sectionTitle}>Reviews</h2>
          <CamperReviews reviews={reviews} />
        </div>

        <div className={css.booking}>
          <BookingForm camperId={camper.id} />
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsClient;
