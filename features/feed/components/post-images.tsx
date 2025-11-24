"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FeedPostMedia } from "../actions";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const PostImages = ({ images }: { images: FeedPostMedia[] }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const displayedImages = images.slice(0, 5);
  const remainingCount = images.length - 5;

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen, images.length]);

  if (images.length === 0) return null;

  const getGridClass = () => {
    const count = displayedImages.length;
    if (count === 1) return "grid-cols-1 grid-rows-2";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-2";
    if (count === 4) return "grid-cols-2 grid-rows-2";
    return "grid-cols-3 grid-rows-2";
  };

  const getImageClass = (index: number, total: number) => {
    if (total === 1) return "row-span-2 aspect-[16/9]";
    if (total === 3 && index === 0) return "row-span-2";
    if (total === 5 && index === 0) return "row-span-2 col-span-1";
    return "";
  };

  return (
    <>
      <div
        className={`grid ${getGridClass()} gap-2 rounded-lg overflow-hidden`}
      >
        {displayedImages.map((image, index) => {
          const isLastImage = index === displayedImages.length - 1;
          const showOverlay = isLastImage && remainingCount > 0;

          return (
            <div
              key={image.id}
              className={`relative group cursor-pointer ${getImageClass(
                index,
                displayedImages.length
              )}`}
              onClick={() => openLightbox(index)}
            >
              <div className="relative w-full h-full min-h-[200px] bg-bg3 overflow-hidden rounded-lg">
                <Image
                  src={image.url}
                  alt={`Post image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {showOverlay && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                    <span className="text-white text-2xl font-semibold">
                      +{remainingCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-color3 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-color3 transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={images[currentImageIndex].url}
                alt={`Post image ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg"
                priority
              />
            </div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-color3 transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
