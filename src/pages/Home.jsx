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
            <section className="relative min-h-[90vh] flex flex-col justify-center px-6 pt-32 pb-16 overflow-hidden bg-background">
                <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    <div className="max-w-3xl">
                        <h1
                            className="text-primary font-serif font-bold text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] leading-[1.1] md:leading-[1.1] tracking-tight"
                        >
                            The last panel you were on was probably missing a woman.
                        </h1>

                        <p
                            className="mt-8 text-xl md:text-2xl text-text-dark font-sans max-w-2xl leading-relaxed"
                        >
                            We've built the directory that removes that excuse. Find verified women experts across industries, available for panels, media, podcasts, and speaking.
                        </p>

                        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <Button to="/directory" variant="primary" className="w-full sm:w-auto text-lg py-4 px-8 border-2 border-primary">
                                Find an Expert
                            </Button>
                            <Button to="/apply" variant="secondary" className="w-full sm:w-auto text-lg py-4 px-8">
                                Apply to be Listed
                            </Button>
                        </div>
                    </div>

                    <div className="relative mt-8 lg:mt-0 w-full hidden md:block">
                        <div className="aspect-[4/3] sm:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden relative shadow-lg">
                            <img
                                src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=1000&auto=format&fit=crop"
                                alt="Professional woman speaking confidently"
                                className="w-full h-full object-cover"
                            />
                            {/* Subtle overlay for styling integration */}
                            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply rounded-[2.5rem]" />
                        </div>

                        {/* Decorative floating stats box */}
                        <div className="absolute -bottom-8 -left-8 bg-surface p-6 rounded-3xl border border-border shadow-sm hidden lg:block z-20">
                            <p className="font-serif text-4xl text-primary font-bold">100%</p>
                            <p className="font-sans text-sm text-text-mid font-bold uppercase tracking-widest mt-1">Verified Experts</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission / Stats Section */}
            <section className="py-24 px-6 bg-surface border-y border-border">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2 w-full order-2 lg:order-1">
                        <div className="aspect-[16/9] lg:aspect-square rounded-3xl overflow-hidden relative shadow-md">
                            <img
                                src="https://images.unsplash.com/photo-1541817374027-6f774313fa42?q=80&w=1000&auto=format&fit=crop"
                                alt="Audience at a conference"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply rounded-3xl" />
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full flex flex-col justify-center order-1 lg:order-2">
                        <h2 className="text-4xl md:text-5xl text-primary font-bold font-serif mb-6 leading-tight">
                            What is Draupadi on the Dais?
                        </h2>
                        <p className="font-sans text-lg md:text-xl text-text-dark leading-relaxed mb-12">
                            We are a curated directory of women experts and speakers.
                            Our mission is to ensure that organizers, journalists, and companies always have access to qualified women for their platforms.
                            A curated directory signals quality, becoming the go-to reference for leadership voices.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full border-t border-border pt-10">
                            <div className="space-y-2">
                                <div className="text-4xl lg:text-5xl font-serif font-bold text-primary">50+</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-text-mid">Experts Listed</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-4xl lg:text-5xl font-serif font-bold text-primary">12</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-text-mid">Industries</div>
                            </div>
                            <div className="space-y-2 col-span-2 sm:col-span-1 pt-6 sm:pt-0 border-t sm:border-t-0 sm:border-l border-border sm:pl-8">
                                <div className="text-4xl lg:text-5xl font-serif font-bold text-primary">1</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-text-mid">Decoding Draupadi Network</div>
                            </div>
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
