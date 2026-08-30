interface IconProps {
  className?: string;
  size?: number;
}

function SpriteIcon({ id, className, size = 20 }: IconProps & { id: string }) {
  return (
    <svg className={className} width={size} height={size} aria-hidden="true">
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
}

export const IconLocation = (props: IconProps) => (
  <SpriteIcon id="icon-location" {...props} />
);

export const IconClose = (props: IconProps) => (
  <SpriteIcon id="icon-close" {...props} />
);

export const IconStar = (props: IconProps) => (
  <SpriteIcon id="icon-star" {...props} />
);

export const IconFuel = (props: IconProps) => (
  <SpriteIcon id="icon-fuel" {...props} />
);

export const IconGearbox = (props: IconProps) => (
  <SpriteIcon id="icon-gearbox" {...props} />
);

export const IconVan = (props: IconProps) => (
  <SpriteIcon id="icon-van" {...props} />
);

export const IconGrid = (props: IconProps) => (
  <SpriteIcon id="icon-grid" {...props} />
);

export const IconAlert = (props: IconProps) => (
  <SpriteIcon id="icon-alert" {...props} />
);

export const IconAc = (props: IconProps) => (
  <SpriteIcon id="icon-ac" {...props} />
);

export const IconKitchen = (props: IconProps) => (
  <SpriteIcon id="icon-kitchen" {...props} />
);

export const IconRadio = (props: IconProps) => (
  <SpriteIcon id="icon-radio" {...props} />
);

export const IconBathroom = (props: IconProps) => (
  <SpriteIcon id="icon-bathroom" {...props} />
);
