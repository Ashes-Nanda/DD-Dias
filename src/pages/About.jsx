import React from 'react';
import Button from '../components/Button';
import anshikaPhoto from '../assets/anshika.jpeg';

export default function About() {
    return (
        <div className="pt-32 pb-24 min-h-screen bg-background">
            <div className="max-w-4xl mx-auto px-6">

                {/* Item 40: Keep headline */}
                <h1 className="font-serif text-5xl md:text-7xl text-primary font-bold mb-16 tracking-tight leading-tight">
                    Why the Dais?
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 font-sans text-lg text-text-dark leading-relaxed">

                    <div className="md:col-span-8 space-y-8">
                        {/* Item 41: Updated paragraph 1 */}
                        <p className="text-2xl font-medium leading-normal">
                            Leadership-level panels and conferences in India are overwhelmingly male, not because qualified women don't exist, but because the infrastructure to find them didn't.
                        </p>
                        <p>
                            Draupadi on the Dais is that infrastructure. Built as a curated, verified platform of India's most credible women voices, available for panels, media, conferences, and public conversation.{' '}
                            <strong className="text-primary">Every woman here has been reviewed and verified.</strong>{' '}
                            That curation is not incidental. It is the entire point.
                        </p>
                        {/* Item 42: Paragraph 2 deleted */}
                        {/* Item 43: Updated Draupadi mythology paragraph */}
                        <p>
                            The name comes from the Mahabharata.{' '}
                            <a href="https://decodingdraupadi.com" target="_blank" rel="noreferrer" className="text-primary underline">Draupadi</a>{' '}
                            was the most intelligent person in every room she entered, and the most consistently overlooked. She demanded a seat. She shifted the center of gravity. This platform exists in that spirit.
                        </p>
                    </div>

                    <div className="md:col-span-4 pl-0 md:pl-8 border-l-0 md:border-l border-border pt-8 md:pt-0">
                        {/* Item 44: Placeholder for Anshika's real photo - replace with actual headshot */}
                        <div className="aspect-[4/5] bg-surface rounded-2xl mb-6 overflow-hidden border border-border">
                            <img
                                src={anshikaPhoto}
                                alt="Anshika Kushwaha - Founder, Draupadi on the Dais"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="font-serif font-bold text-xl text-primary mb-1">Anshika Kushwaha</p>
                        <p className="font-sans text-sm text-text-mid uppercase tracking-widest font-bold mb-2">Founder</p>
                        <a href="https://www.linkedin.com/in/akatc4e/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-sans text-xs text-primary font-medium hover:underline mb-4">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                            LinkedIn Profile
                        </a>
                        {/* Item 45: Updated founder bio */}
                        <div className="font-sans text-sm text-text-dark leading-relaxed space-y-3">
                            <p>
                                Draupadi on the Dais is an initiative by Anshika Kushwaha, Founder of <a href="https://decodingdraupadi.com" target="_blank" rel="noreferrer" className="underline text-primary">Decoding Draupadi</a>, a platform built around the lives of urban Indian working women.
                            </p>
                            <p>
                                Anshika built the Dais after three years inside conversations with 5,000+ women, and noticing how rarely their expertise translated into public visibility. The Dais exists to change that ratio, one verified profile at a time.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="mt-24 pt-16 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button to="/directory" variant="primary" className="py-4 px-8 text-lg w-full sm:w-auto">
                        Find a Voice
                    </Button>
                    <Button to="/apply" variant="secondary" className="py-4 px-8 text-lg w-full sm:w-auto text-primary border-primary">
                        Join the Dais
                    </Button>
                </div>

            </div>
        </div>
    );
}
