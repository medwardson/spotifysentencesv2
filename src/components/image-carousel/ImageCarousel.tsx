import React, { FC } from "react";

import styles from "./ImageCarousel.module.scss";
import Image from "next/image";
import { combineClasses } from "@/utils/styles";

interface ImageCarouselProps {
    images: string[];
    className?: string;
}

const ImageCarousel: FC<ImageCarouselProps> = ({ images, className }) => {
    return (
        <div
            className={combineClasses(className, styles["carousel-container"])}
        >
            <div className={`${styles["carousel-track"]} flex`}>
                {images.map((image, index) => (
                    <Image
                        width={168}
                        height={168}
                        key={index}
                        className={`${styles.image} rounded-xl m-4`}
                        src={image}
                        alt={`image ${index}`}
                    />
                ))}
                {/* Duplicate the images to create the infinite scroll effect */}
                {images.map((image, index) => (
                    <Image
                        width={168}
                        height={168}
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
