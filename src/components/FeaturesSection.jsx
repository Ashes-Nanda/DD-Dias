import { useEffect, useState } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mic, Users, MessageSquare, Headphones, Building2 } from 'lucide-react';

import dais3Image from '../assets/dais 3.png';
import dais1Image from '../assets/dais 1.png';

export function FeaturesSection() {
    const [experts, setExperts] = useState([]);

    useEffect(() => {
        supabase
            .from('experts')
            .select('slug, full_name, title, tags, photo_url')
            .eq('status', 'approved')
            .order('created_at', { ascending: false })
            .limit(4)
            .then(({ data }) => {
                if (data && data.length > 0) {
                    setExperts(data.map(e => ({
                        slug: e.slug,
                        name: e.full_name,
                        title: e.title,
                        tags: e.tags || [],
                        photo: e.photo_url || null,
                    })));
                }
            });
    }, []);

    const organiserItems = [
        { icon: Users, label: 'Panel discussions' },
        { icon: Mic, label: 'Keynote speakers' },
        { icon: MessageSquare, label: 'Media quotes & commentary' },
        { icon: Headphones, label: 'Podcast guests' },
        { icon: Building2, label: 'Corporate events' },
    ];

    return (
        <div className="bg-surface py-24 px-6 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-32">

                {/* Card 1: Who's on the Dais (Featured Voices) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h3 className="font-serif text-4xl text-primary font-bold mb-6">Who's on the Dais?</h3>
                        <p className="font-sans text-text-dark text-lg mb-8 leading-relaxed max-w-md">
                            A selection of India's most credible women. Practitioners, researchers, executives, and public thinkers. Available for panels, media, and public conversation.
                        </p>
                        <Button to="/directory" variant="secondary">Enter the Dais</Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 relative group">
                        {experts.length > 0 ? (
                            experts.map((expert) => (
                                <Link to={`/expert/${expert.slug}`} key={expert.slug} className="relative aspect-[4/5] overflow-hidden rounded-2xl group/card cursor-pointer">
                                    {expert.photo ? (
                                        <img src={expert.photo} alt={expert.name} className="object-cover w-full h-full transition-transform duration-700 group-hover/card:scale-105" />
                                    ) : (
                                        <div className="w-full h-full bg-primary-light flex items-center justify-center font-serif italic text-primary text-lg">No Photo</div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                        <p className="text-white font-serif font-bold text-lg">{expert.name}</p>
                                        <p className="text-white/80 font-sans text-sm">{expert.tags[0]}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            /* Empty state while directory data loads */
                            <div 
                                className="col-span-2 aspect-[2/1] rounded-2xl bg-primary-light border border-primary/20 flex flex-col items-center justify-center gap-3 text-center px-6"
                                style={{
                                    backgroundImage: `url(${dais3Image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <p className="font-serif text-2xl text-primary font-bold">Voices launching soon.</p>
                                <p className="font-sans text-sm text-text-mid">Every profile is reviewed and verified before going live.</p>
                                <Link to="/directory" className="font-sans text-sm text-primary font-medium hover:underline mt-1">Browse the Dais →</Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Card 2: For Organisers & Media */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center place-items-center">
                    <div className="order-2 lg:order-1 bg-white border border-border rounded-3xl p-10 shadow-sm w-full h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <div className="w-24 h-24 border border-primary rounded-full animate-ping" />
                        </div>
                        <ul className="space-y-5">
                            {organiserItems.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex items-center gap-4">
                                    <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                                        <Icon size={18} />
                                    </span>
                                    <span className="font-sans text-lg text-text-dark font-medium">{label}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="font-sans text-sm text-text-mid mt-8 leading-relaxed">Finding the right woman for the room is no longer an excuse.</p>
                    </div>
                    <div className="order-1 lg:order-2">
                        <h3 className="font-serif text-4xl text-primary font-bold mb-6">For Organisers & Media</h3>
                        <p className="font-sans text-text-dark text-lg mb-8 leading-relaxed max-w-md">
                            If you're putting together a panel, conference, podcast, or media segment, this is where you find her. Not a search engine. A curated network of women who have been verified to be exactly who they say they are. No noise. Just the right voice for the room.
                        </p>
                        {/* Second CTA differentiated from 'Enter the Dais' above (#23) */}
                        <Button to="/directory" variant="primary">Find Verified Speakers</Button>
                    </div>
                </div>

                {/* Card 3: Ready to be found? */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        {/* #26: Changed from 'Ready to take the stage?' to reduce repetition */}
                        <h3 className="font-serif text-4xl text-primary font-bold mb-6">Ready to be found?</h3>
                        <p className="font-sans text-text-dark text-lg mb-8 leading-relaxed max-w-md">
                            Get on the Dais. Stay in the conversation. You don't need to wait to be invited. If you have the expertise, we make sure you're seen and called. Not everyone gets in. That's the point.
                        </p>
                        <Button to="/apply" variant="primary">Join the Dais</Button>
                    </div>
                    <div 
                        className="bg-primary text-primary-light rounded-[2.5rem] p-12 relative overflow-hidden h-full flex flex-col items-center justify-center min-h-[400px]"
                        style={{
                            backgroundImage: `url(${dais1Image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="text-center relative z-10">
                            <div className="font-serif text-5xl md:text-6xl mb-4 text-white">Take the stage.</div>
                            <div className="font-serif text-5xl md:text-6xl text-white">Officially.</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
