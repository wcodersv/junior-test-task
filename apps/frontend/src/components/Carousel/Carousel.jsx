import React, { useState } from 'react';
import './Carousel.css';

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };


    return (
        <div className="slider-container">
            {images && images.length > 1 && (
                <button className="arrow prev button-custom " onClick={goToPrevSlide} type='button'>
                    &lt;
                </button>
            )}


            {images && images.length > 0 && (
                <picture>
                    <source srcSet={images[currentIndex]?.image} type="image/avif" />
                    <source srcSet={images[currentIndex]?.image} type="image/webp" />
                    <img
                        src={images[currentIndex]?.image}
                        alt={`Slide ${currentIndex + 1}`}
                        width='100%'
                        height={400}
                        className="slide"
                    />
                </picture>
            )}

            {images && images.length > 1 && (
                <button className="arrow next button-custom" onClick={goToNextSlide} type='button'>
                    &gt;
                </button>
            )}
        </div>
    );
}

export default Carousel;