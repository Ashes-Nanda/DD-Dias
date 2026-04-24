import { useEffect, useState } from 'react';

import slide1 from '../assets/landing carousal.png';
import slide2 from '../assets/lc 2.png';
import slide3 from '../assets/lc3.png';
import slide4 from '../assets/lc4.png';

const SLIDES = [
    { src: slide1, alt: 'Woman speaking on the Dais' },
    { src: slide2, alt: 'Woman speaking at a panel' },
    { src: slide3, alt: 'Woman on stage at a conference' },
    { src: slide4, alt: 'Woman taking the stage' },
];

const INTERVAL_MS = 3500;

export default function HeroCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        SLIDES.forEach(({ src }) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    useEffect(() => {
        const id = setInterval(() => {
            setActiveIndex((i) => (i + 1) % SLIDES.length);
        }, INTERVAL_MS);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="w-full h-full aspect-[4/3] sm:aspect-square lg:aspect-auto rounded-[2.5rem] overflow-hidden relative shadow-lg bg-primary-light">
            {SLIDES.map((slide, index) => (
                <img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    aria-hidden={index !== activeIndex}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                        index === activeIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            ))}
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply rounded-[2.5rem] pointer-events-none" />
        </div>
    );
}
