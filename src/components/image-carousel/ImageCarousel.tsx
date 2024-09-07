import React from "react";

import styles from "./ImageCarousel.module.scss";

interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
    return (
        <div className={styles["carousel-container"]}>
            <div className={`${styles["carousel-track"]} flex`}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        className={`${styles.image} rounded-xl m-4`}
                        src={image}
                        alt={`image ${index}`}
                    />
                ))}
                {/* Duplicate the images to create the infinite scroll effect */}
                {images.map((image, index) => (
                    <img
                        key={index + images.length}
                        className={`${styles.image} rounded-xl m-4`}
                        src={image}
                        alt={`image ${index}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageCarousel;
