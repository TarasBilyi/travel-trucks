import css from "./CamperReviews.module.css";
import RatingStars from "@/components/RatingStars/RatingStars";
import { CamperReview } from "@/types/camper";

interface CamperReviewsProps {
  reviews: CamperReview[];
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

const CamperReviews = ({ reviews }: CamperReviewsProps) => {
  if (reviews.length === 0) {
    return <p className={css.empty}>No reviews yet.</p>;
  }

  return (
    <ul className={css.list}>
      {reviews.map((review) => (
        <li key={review.id} className={css.item}>
          <div className={css.person}>
            <div className={css.avatar}>{getInitial(review.reviewer_name)}</div>
            <div className={css.nameRating}>
              <p className={css.name}>{review.reviewer_name}</p>
              <RatingStars rating={review.reviewer_rating} />
            </div>
          </div>
          <p className={css.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
};

export default CamperReviews;
