import React from 'react';
import Button from '../components/Button';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

import { FeaturesSection } from '../components/FeaturesSection';
import { PhilosophySection } from '../components/PhilosophySection';
import { ProtocolSection } from '../components/ProtocolSection';

import dais4Image from '../assets/dais 4.png';
import dais2Image from '../assets/dais 2.png';
export default function Home() {
    return (
        <div className="w-full relative bg-background">
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex flex-col justify-center px-6 pt-32 pb-16 overflow-hidden bg-background">
                <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 lg:items-stretch items-center">
                    <div className="max-w-3xl flex flex-col justify-center py-4 lg:py-8">
                        <h1
                            className="text-primary font-serif font-bold text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] leading-[1.1] md:leading-[1.1] tracking-tight"
                        >
                            The last panel you were on was probably missing a woman.
                        </h1>

                        <p
                            className="mt-8 text-xl md:text-2xl text-text-dark font-sans max-w-2xl leading-relaxed"
                        >
                            We built Draupadi on the Dais to remove that excuse. Find the right voice for your panel, your platform, your story. From a curated network of India's most credible women, verified and ready.
                        </p>

                        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <Button to="/directory" variant="primary" className="w-full sm:w-auto text-lg py-4 px-8 border-2 border-primary">
                                Find Verified Speakers
                            </Button>
                            <Button to="/apply" variant="secondary" className="w-full sm:w-auto text-lg py-4 px-8">
                                Join the Dais
                            </Button>
                        </div>

                        {/* Credibility strip - moved here from buried stats section (#28) */}
                        <div className="mt-8 flex flex-wrap gap-6 font-sans text-sm text-text-mid">
                            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />100% Verified</span>
                            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />12 Industries</span>
                            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />Free to Apply</span>
                        </div>

                        {/* Item 9: Expert acknowledgement line */}
                        <p className="mt-6 font-sans text-sm text-text-mid">
                            Are you the voice that keeps getting left off the list?{' '}
                            <Link to="/apply" className="text-primary font-medium hover:underline">
                                Join the Dais →
                            </Link>
                        </p>
                    </div>

                    <div className="relative mt-8 lg:mt-0 w-full hidden md:block lg:h-full">
                        <div className="w-full h-full aspect-[4/3] sm:aspect-square lg:aspect-auto rounded-[2.5rem] overflow-hidden relative shadow-lg">
                            <img
                                src={dais4Image}
                                alt="Draupadi on the Dais"
                                className="w-full h-full object-cover"
                            />
                            {/* Subtle overlay for styling integration */}
                            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply rounded-[2.5rem]" />
                        </div>

                        {/* Decorative floating stats box */}
                        <div className="absolute -bottom-8 -left-8 bg-surface p-6 rounded-3xl border border-border shadow-sm hidden lg:block z-20">
                            <p className="font-serif text-4xl text-primary font-bold">100%</p>
                            <p className="font-sans text-sm text-text-mid font-bold uppercase tracking-widest mt-1">Verified</p>
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
                                src={dais2Image}
                                alt="Indian woman speaking at a panel"
                                className="w-full h-full object-cover transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply rounded-3xl" />
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full flex flex-col justify-center order-1 lg:order-2">
                        <h2 className="text-4xl md:text-5xl text-primary font-bold font-serif mb-6 leading-tight">
                            What is Draupadi on the Dais?
                        </h2>
                        <div className="font-sans text-lg md:text-xl text-text-dark leading-relaxed mb-12 space-y-4">
                            <p>Draupadi on the Dais is not a list. It is a standard. A curated network of credible women speakers, reviewed, verified, and ready. No searching. No second-guessing. No excuses.</p>
                            <p>For organisers, journalists, and companies who are serious about who gets a seat at the table.</p>
                        </div>

                        <div className="flex flex-wrap gap-6 w-full border-t border-border pt-10">
                            <div className="space-y-1">
                                <div className="text-4xl lg:text-5xl font-serif font-bold text-primary">100%</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-text-mid">Verified</div>
                            </div>
                            <div className="space-y-1 border-l border-border pl-6">
                                <div className="text-4xl lg:text-5xl font-serif font-bold text-primary">12</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-text-mid">Industries</div>
                            </div>
                            <div className="space-y-1 border-l border-border pl-6 flex flex-col justify-center">
                                <div className="text-xs font-bold uppercase tracking-widest text-text-mid">Part of the Decoding Draupadi Network</div>
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
