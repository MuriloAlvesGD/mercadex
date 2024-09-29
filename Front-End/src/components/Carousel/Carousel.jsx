import React, { useState } from 'react';

const Carousel = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % React.Children.count(children));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + React.Children.count(children)) % React.Children.count(children));
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ margin: '20px' }}>
                {React.Children.toArray(children)[currentIndex]}
            </div>
            <button onClick={handlePrev} disabled={currentIndex === 0}>
                Anterior
            </button>
            <button onClick={handleNext} disabled={currentIndex === React.Children.count(children) - 1}>
                Próximo
            </button>
        </div>
    );
};

export default Carousel;