import Link from "next/link";
import css from "./CamperCard.module.css";
import RatingStars from "@/components/RatingStars/RatingStars";
import {
  IconFuel,
  IconGearbox,
  IconLocation,
  IconVan,
} from "@/components/Icons/Icons";
import { humanize } from "@/lib/format";
import { CamperListItem } from "@/types/camper";

interface CamperCardProps {
  camper: CamperListItem;
}

const CamperCard = ({ camper }: CamperCardProps) => {
  return (
    <li className={css.card}>
      <div className={css.imageWrapper}>
        {camper.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={css.image}
            src={camper.coverImage}
            alt={camper.name}
          />
        ) : (
          <div className={css.imagePlaceholder} />
        )}
      </div>

      <div className={css.content}>
        <div className={css.headerRow}>
          <h3 className={css.name}>{camper.name}</h3>
          <p className={css.price}>&euro;{camper.price}</p>
        </div>

        <div className={css.metaRow}>
          <span className={css.rating}>
            <RatingStars rating={camper.rating} size={16} />
            {camper.rating.toFixed(1)}({camper.totalReviews} Reviews)
          </span>
          <span className={css.location}>
            <IconLocation size={16} />
            {camper.location}
          </span>
        </div>

        <p className={css.description}>{camper.description}</p>

        <ul className={css.badges}>
          <li className={css.badge}>
            <IconFuel size={20} />
            {humanize(camper.engine)}
          </li>
          <li className={css.badge}>
            <IconGearbox size={20} />
            {humanize(camper.transmission)}
          </li>
          <li className={css.badge}>
            <IconVan size={20} />
            {humanize(camper.form)}
          </li>
        </ul>

        <Link
          className={css.showMore}
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Show more
        </Link>
      </div>
    </li>
  );
};

export default CamperCard;
