import css from "./RatingStars.module.css";
import { IconStar } from "@/components/Icons/Icons";

interface RatingStarsProps {
  rating: number;
  size?: number;
  count?: number;
}

const RatingStars = ({ rating, size = 16, count = 5 }: RatingStarsProps) => {
  if (count === 1) {
    return (
      <span className={css.stars} aria-label={`Rating: ${rating}`}>
        <span className={css.filled} style={{ width: size, height: size }}>
          <IconStar size={size} />
        </span>
      </span>
    );
  }

  const rounded = Math.round(rating);

  return (
    <span className={css.stars} aria-label={`Rating: ${rating} of 5`}>
      {Array.from({ length: count }, (_, index) => (
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
