import { useGetAds } from 'hooks/use_ads';
import React, { useState, useEffect } from 'react';
import './Advertisement.css'; // Import your CSS file for styling

const PlaceholderImage = () => (
    <div className="placeholder-image">
        <div className="placeholder-text">Loading...</div>
    </div>
);

const AdvertisementSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const { banners, isLoaded } = useGetAds();

    useEffect(() => {
        // Automatically slide to the next item every 3 seconds
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [banners]);

    return (
        <div className="ads-container">
            <div className="advertisement-slider">
                {banners.map((banner, index) => (
                    <div key={index} className={`advertisement-slide ${index === currentIndex ? 'active' : ''}`}>
                        {index === currentIndex ? (
                            <>
                                <a href={banner.url} target="_blank" rel="noopener noreferrer" className="advertisement-link">
                                <img src={banner.banner} alt={`Advertisement ${index + 1}`} className="advertisement-image" />
                                </a>
                            </>
                        ) : (
                            <PlaceholderImage />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdvertisementSlider;