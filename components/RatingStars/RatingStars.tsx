import css from "./RatingStars.module.css";
import { IconStar } from "@/components/Icons/Icons";

interface RatingStarsProps {
  rating: number;
  size?: number;
}

const STAR_COUNT = 5;

const RatingStars = ({ rating, size = 16 }: RatingStarsProps) => {
  const rounded = Math.round(rating);

  return (
    <span className={css.stars} aria-label={`Rating: ${rating} of 5`}>
      {Array.from({ length: STAR_COUNT }, (_, index) => (
        <span
          key={index}
          className={index < rounded ? css.filled : css.empty}
          style={{ width: size, height: size }}
        >
          <IconStar size={size} />
        </span>
      ))}
    </span>
  );
};

export default RatingStars;
