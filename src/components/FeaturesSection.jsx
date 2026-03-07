import React from 'react';
import { cn } from '../lib/utils';
import Button from './Button';
import { Link } from 'react-router-dom';

const mockExperts = [
    { id: 1, name: "Dr. Aditi Sharma", title: "Chief Economist", org: "Global Finance Inst.", city: "Mumbai", tags: ["Finance", "Leadership"], photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" },
    { id: 2, name: "Priya Desai", title: "VP Product", org: "TechFlow", city: "Bangalore", tags: ["Tech", "Product"], photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop" },
    { id: 3, name: "Sarah Thomas", title: "Climate Researcher", org: "Earth Policy", city: "Delhi", tags: ["Climate", "Policy"], photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" },
    { id: 4, name: "Neha Gupta", title: "Managing Partner", org: "VentureX", city: "Remote", tags: ["Investing", "Startups"], photo: "https://images.unsplash.com/photo-1598550874175-4d0ef43ce28d?q=80&w=600&auto=format&fit=crop" },
];

export function FeaturesSection() {
    return (
        <div className="bg-surface py-24 px-6 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-32">

                {/* Card 1: Diagnostic Shuffler (Featured Experts) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h3 className="font-serif text-4xl text-primary font-bold mb-6">Verified Brilliance</h3>
                        <p className="font-sans text-text-dark text-lg mb-8 leading-relaxed max-w-md">
                            A curated selection of thought leaders, practitioners, and executives from the directory. Discover voices that elevate your panel.
                        </p>
                        <Button to="/directory" variant="secondary">Start Browsing</Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 relative group">
                        {mockExperts.map((expert, i) => (
                            <Link to={`/expert/${expert.id}`} key={expert.id} className="relative aspect-[4/5] overflow-hidden rounded-2xl group/card cursor-pointer">
                                <img src={expert.photo} alt={expert.name} className="object-cover w-full h-full transition-transform duration-700 group-hover/card:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                    <p className="text-white font-serif font-bold text-lg">{expert.name}</p>
                                    <p className="text-white/80 font-sans text-sm">{expert.tags[0]}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Card 2: Telemetry Typewriter (For Organisers) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center place-items-center">
                    <div className="order-2 lg:order-1 bg-white border border-border rounded-3xl p-10 shadow-sm w-full h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <div className="w-24 h-24 border border-primary rounded-full animate-ping" />
                        </div>
                        <div className="font-mono text-xs text-text-mid mb-4">LOG // USE_CASES.TXT</div>
                        <p className="font-sans text-xl text-primary leading-loose tracking-wide font-medium min-h-[160px]">
                            Panel discussions. Keynote speakers. Media quotes and commentary. Podcast guests. Corporate events. Finding the right woman for the room is no longer an excuse.
                        </p>
                    </div>
                    <div className="order-1 lg:order-2">
                        <h3 className="font-serif text-4xl text-primary font-bold mb-6">For Organisers & Media</h3>
                        <p className="font-sans text-text-dark text-lg mb-8 leading-relaxed max-w-md">
                            If you're putting together a panel, conference, or media segment and need to find the right woman for the room, this directory is built for you. No noise, just vetted quality.
                        </p>
                        <Button to="/directory" variant="primary">Access the Directory</Button>
                    </div>
                </div>

                {/* Card 3: Cursor Protocol Scheduler (For Experts) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h3 className="font-serif text-4xl text-primary font-bold mb-6">Are You an Expert?</h3>
                        <p className="font-sans text-text-dark text-lg mb-8 leading-relaxed max-w-md">
                            If you're a thought leader, practitioner, researcher, or executive who wants to be found for the right opportunities — apply to join the directory. Applications are reviewed by our team.
                        </p>
                        <Button to="/apply" variant="primary">Apply to be Listed</Button>
                    </div>
                    <div className="bg-primary text-primary-light rounded-[2.5rem] p-12 relative overflow-hidden h-full flex flex-col items-center justify-center min-h-[400px]">
                        <div className="text-center relative z-10">
                            <div className="font-serif text-5xl md:text-6xl mb-4 text-white">Take the stage.</div>
                            <div className="font-serif text-5xl md:text-6xl text-primary-light/60">Officially.</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
