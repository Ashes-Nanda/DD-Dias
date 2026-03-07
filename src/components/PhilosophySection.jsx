import React from 'react';

export function PhilosophySection() {

    return (
        <section
            className="relative min-h-[80vh] flex items-center justify-center bg-[#0a0507] text-white px-6 overflow-hidden"
        >
            {/* Parallax noise/texture overlay for the dark section */}
            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')",
                    backgroundSize: '200px 200px'
                }}
            />
            <div className="max-w-4xl mx-auto text-center z-10 relative">
                <h2 className="font-serif text-3xl md:text-5xl font-bold mb-8 text-primary-light/50 tracking-tight">
                    The Philosophy
                </h2>
                <p className="font-sans text-2xl md:text-4xl leading-relaxed md:leading-[1.4] text-white font-medium">
                    Open directories become noise. Curated directories become go-to references. We chose the latter.
                </p>
            </div>
        </section>
    );
}
