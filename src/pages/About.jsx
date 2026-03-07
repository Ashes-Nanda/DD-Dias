import React from 'react';
import Button from '../components/Button';

export default function About() {
    return (
        <div className="pt-32 pb-24 min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-6">

                <h1 className="font-serif text-5xl md:text-7xl text-primary font-bold mb-16 tracking-tight leading-tight">
                    Why the Dais?
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 font-sans text-lg text-text-dark leading-relaxed">

                    <div className="md:col-span-8 space-y-8">
                        <p className="text-2xl font-medium leading-normal">
                            Leadership-level panels and conferences in India are overwhelmingly male because organizers claim they "cannot find" qualified women.
                            This website is the solution to that excuse.
                        </p>
                        <p>
                            We realized that open directories quickly become noisy. When everyone is an expert, no one is.
                            That's why Draupadi on the Dais shifted to a curated, application-based model. We want to be the tool that serious journalists, event producers, and corporate organizers turn to when they need vetted quality.
                        </p>
                        <p>
                            The name draws inspiration from the mythology of Draupadi — a powerful, rooted figure who demanded a seat, voiced truths others avoided, and shifted the center of gravity in every room she entered.
                        </p>
                    </div>

                    <div className="md:col-span-4 pl-0 md:pl-8 border-l-0 md:border-l border-border pt-8 md:pt-0">
                        <div className="aspect-[4/5] bg-surface rounded-2xl mb-6 overflow-hidden border border-border">
                            {/* Fallback image of founder if no actual image URL provided */}
                            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" alt="Anshika Kushwaha" className="w-full h-full object-cover" />
                        </div>
                        <p className="font-serif font-bold text-xl text-primary mb-1">Anshika Kushwaha</p>
                        <p className="font-sans text-sm text-text-mid uppercase tracking-widest font-bold mb-4">Founder</p>
                        <p className="font-sans text-sm text-text-dark leading-relaxed">
                            Draupadi on the Dais is an initiative by Anshika Kushwaha, Founder of <a href="#" className="underline text-primary">Decoding Draupadi</a>. She created this directory to remove the friction preventing diverse representation on stages across India.
                        </p>
                    </div>

                </div>

                <div className="mt-24 pt-16 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button to="/directory" variant="primary" className="py-4 px-8 text-lg w-full sm:w-auto">
                        Find an Expert
                    </Button>
                    <Button to="/apply" variant="secondary" className="py-4 px-8 text-lg w-full sm:w-auto text-primary border-primary">
                        Apply to be Listed
                    </Button>
                </div>

            </div>
        </div>
    );
}
