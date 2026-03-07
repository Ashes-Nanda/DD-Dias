import React from 'react';
import Button from '../components/Button';
import { cn } from '../lib/utils';
import { ArrowLeftRight, Terminal, Clock } from 'lucide-react'; // Placeholder icons for features

import { FeaturesSection } from '../components/FeaturesSection';
import { PhilosophySection } from '../components/PhilosophySection';
import { ProtocolSection } from '../components/ProtocolSection';

export default function Home() {
    return (
        <div className="w-full relative bg-background">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col justify-center px-6 pt-24 pb-12 overflow-hidden bg-background">
                <div className="max-w-5xl mx-auto w-full z-10">
                    <h1
                        className="text-primary font-serif font-bold text-5xl md:text-7xl lg:text-7xl xl:text-[5rem] leading-[1.1] md:leading-[1.1] tracking-tight max-w-4xl"
                    >
                        The last panel you were on was probably missing a woman.
                    </h1>

                    <p
                        className="mt-8 text-xl md:text-2xl text-text-dark font-sans max-w-2xl leading-relaxed"
                    >
                        We've built the directory that removes that excuse. Find verified women experts across industries, available for panels, media, podcasts, and speaking.
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <Button to="/directory" variant="primary" className="w-full sm:w-auto text-lg py-4 px-8">
                            Find an Expert
                        </Button>
                        <Button to="/apply" variant="secondary" className="w-full sm:w-auto text-lg py-4 px-8">
                            Apply to be Listed
                        </Button>
                    </div>
                </div>
            </section>

            {/* Mission / Stats Section */}
            <section className="py-24 px-6 bg-surface border-y border-border">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:w-1/3">
                        <h2 className="text-3xl md:text-4xl text-text-dark mb-6">
                            What is Draupadi on the Dais?
                        </h2>
                        <p className="font-sans text-lg text-text-mid leading-relaxed">
                            We are a curated directory of women experts and speakers.
                            Our mission is to ensure that organizers, journalists, and companies always have access to qualified women for their platforms.
                            A curated directory signals quality, becoming the go-to reference for leadership voices.
                        </p>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full border-t sm:border-t-0 sm:border-l border-border pt-8 sm:pt-0 sm:pl-16">
                        <div className="space-y-2">
                            <div className="text-5xl font-serif font-bold text-primary">50+</div>
                            <div className="text-sm font-bold uppercase tracking-widest text-text-mid">Experts Listed</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-serif font-bold text-primary">12</div>
                            <div className="text-sm font-bold uppercase tracking-widest text-text-mid">Industries Covered</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-serif font-bold text-primary">1</div>
                            <div className="text-sm font-bold uppercase tracking-widest text-text-mid">Decoding Draupadi Network</div>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesSection />
            <PhilosophySection />
            <ProtocolSection />
        </div>
    );
}
