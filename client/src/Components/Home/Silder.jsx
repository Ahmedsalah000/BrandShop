import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Slider.css';

import sliderimg from "../../images/slider1.png";
import slider4 from "../../images/slider4.png";
import prod3 from "../../images/prod3.png";
import prod4 from "../../images/prod4.png";

const Silder = () => {
    const [index, setIndex] = useState(0);
    const [imageError, setImageError] = useState(false);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const slides = [
        {
            image: slider4,
            title: "هناك خصم كبير",
            description: "خصم يصل ٥٠٪ عند شرائك",
            background: "slider-background"
        },
        {
            image: sliderimg,
            title: "عروض حصرية",
            description: "تخفيضات تصل إلى ٧٠٪",
            background: "slider-background2"
        },
        {
            image: prod3,
            title: "منتجات جديدة",
            description: "اكتشف أحدث المنتجات",
            background: "slider-background3"
        },
        {
            image: prod4,
            title: "منتجات مميزة",
            description: "اكتشف منتجاتنا المميزة",
            background: "slider-background4"
        }
    ];

    return (
        <div className="slider-wrapper">
            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                interval={3000}
                indicators={true}
                pause="hover"
                className="custom-carousel"
prevIcon={<span className="carousel-control-prev-icon" />}
                nextIcon={<span className="carousel-control-next-icon" />}
                
                dir="ltr"
            >
                {slides.map((slide, idx) => (
                    <Carousel.Item 
                        key={idx} 
                        className={slide.background}
                    >
                        <div className="slider-content">
                            <div className="image-container">
                                <LazyLoadImage
                                    effect="blur"
                                    src={slide.image}
                                    onError={handleImageError}
                                    alt={`Slide ${idx + 1}`}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '350px',
                                        objectFit: 'contain'
                                    }}
                                    placeholderSrc="/placeholder-image.jpg"
                                />
                            </div>
                            <div className="text-container">
                                <h2 className="slider-title">{slide.title}</h2>
                                <p className="slider-text">{slide.description}</p>
                                <button className="shop-now-btn">تسوق الآن</button>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default Silder;
