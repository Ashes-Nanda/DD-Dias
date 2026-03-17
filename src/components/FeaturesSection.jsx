import { useEffect, useState } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

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

    return (
        <div className="bg-surface py-24 px-6 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-32">

                {/* Card 1: Who's on the Dais (Featured Voices) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        {/* Item 13: "Verified Brilliance" → "Who's on the Dais?" */}
                        <h3 className="font-serif text-4xl text-primary font-bold mb-6">Who's on the Dais?</h3>
                        {/* Item 14: Updated body copy */}
                        <p className="font-sans text-text-dark text-lg mb-8 leading-relaxed max-w-md">
                            A selection of India's most credible women. Practitioners, researchers, executives, and public thinkers. Available for panels, media, and public conversation.
                        </p>
                        {/* Item 15: "Start Browsing" → "Enter the Dais" */}
                        <Button to="/directory" variant="secondary">Enter the Dais</Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 relative group">
                        {experts.map((expert) => (
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
                        ))}
                    </div>
                </div>

                {/* Card 2: For Organisers & Media */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center place-items-center">
                    <div className="order-2 lg:order-1 bg-white border border-border rounded-3xl p-10 shadow-sm w-full h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <div className="w-24 h-24 border border-primary rounded-full animate-ping" />
                        </div>
                        {/* Item 24: DELETE "LOG // USE_CASES.TXT" label */}
                        <p className="font-sans text-xl text-primary leading-loose tracking-wide font-medium min-h-[160px]">
                            Panel discussions. Keynote speakers. Media quotes and commentary. Podcast guests. Corporate events. Finding the right woman for the room is no longer an excuse.
                        </p>
                    </div>
                    <div className="order-1 lg:order-2">
                        {/* Item 16: Keep headline */}
                        <h3 className="font-serif text-4xl text-primary font-bold mb-6">For Organisers & Media</h3>
                        {/* Item 17: Updated body copy */}
                        <p className="font-sans text-text-dark text-lg mb-8 leading-relaxed max-w-md">
                            If you're putting together a panel, conference, podcast, or media segment, this is where you find her. Not a search engine. A curated network of women who have been verified to be exactly who they say they are. No noise. Just the right voice for the room.
                        </p>
                        {/* Item 18: "Access the Directory" → "Enter the Dais" */}
                        <Button to="/directory" variant="primary">Enter the Dais</Button>
                    </div>
                </div>

                {/* Card 3: Ready to take the stage? */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        {/* Item 19: "Are You an Expert?" → "Ready to take the stage?" */}
                        <h3 className="font-serif text-4xl text-primary font-bold mb-6">Ready to take the stage?</h3>
                        {/* Item 20: Updated body copy */}
                        <p className="font-sans text-text-dark text-lg mb-8 leading-relaxed max-w-md">
                            If you have expertise, a point of view, and a track record, you belong on the Dais. We're looking for practitioners, researchers, executives, and public thinkers who want to be found for the right opportunities. Applications are reviewed personally. Not everyone gets in. That's the point.
                        </p>
                        {/* Item 21: "Apply to be Listed" → "Join the Dais" */}
                        <Button to="/apply" variant="primary">Join the Dais</Button>
                    </div>
                    {/* Item 22: FIX BUG — "Officially." in faded/ghost colour. Make both lines full white, equal weight */}
                    <div className="bg-primary text-primary-light rounded-[2.5rem] p-12 relative overflow-hidden h-full flex flex-col items-center justify-center min-h-[400px]">
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
