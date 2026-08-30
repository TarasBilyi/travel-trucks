"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import css from "./CamperGallery.module.css";
import { CamperGalleryImage } from "@/types/camper";

interface CamperGalleryProps {
  images: CamperGalleryImage[];
  name: string;
}

const CamperGallery = ({ images, name }: CamperGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (images.length === 0) {
    return <div className={css.placeholder} />;
  }

  const sorted = [...images].sort((a, b) => a.order - b.order);

  return (
    <div className={css.gallery}>
      <Swiper
        modules={[FreeMode, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        loop={sorted.length > 1}
        className={css.mainSwiper}
      >
        {sorted.map((image, index) => (
          <SwiperSlide key={image.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={css.mainImage}
              src={image.original}
              alt={`${name} photo ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {sorted.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          spaceBetween={16}
          slidesPerView={Math.min(sorted.length, 4)}
          freeMode
          watchSlidesProgress
          className={css.thumbsSwiper}
        >
          {sorted.map((image, index) => (
            <SwiperSlide key={image.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={css.thumbImage}
                src={image.thumb}
                alt={`${name} thumbnail ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CamperGallery;
