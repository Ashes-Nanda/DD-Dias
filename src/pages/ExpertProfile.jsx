import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, MapPin, Briefcase } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ExpertCard from '../components/ExpertCard';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

// Mock specific details that aren't in the directory level mock array
// MOCK_BIO and MOCK_PRESS are replaced by data fetched from Supabase

export default function ExpertProfile() {
    const { slug } = useParams();
    const [expertData, setExpertData] = useState(null);
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchProfile = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('experts')
                .select('*')
                .eq('slug', slug)
                .single();

            if (data) {
                const mapped = {
                    id: data.id,
                    slug: data.slug,
                    name: data.full_name,
                    title: data.title,
                    org: data.organisation,
                    city: data.city || [],
                    industries: data.industries || [],
                    tags: data.tags || [],
                    appearanceTypes: data.appearance_types || [],
                    photo: data.photo_url || null,
                    bio: data.bio || "Bio coming soon.",
                    linkedin: data.linkedin_url,
                    instagram: data.instagram_handle,
                    website: data.website_url,
                    press: data.press_links || [],
                };
                setExpertData(mapped);

                // Fetch recommendations (random 3 approved experts)
                const { data: recData } = await supabase
                    .from('experts')
                    .select('*')
                    .eq('status', 'approved')
                    .neq('id', data.id)
                    .limit(3);

                if (recData) {
                    setRecommended(recData.map(r => ({
                        id: r.id, slug: r.slug, name: r.full_name, title: r.title, org: r.organisation,
                        city: r.city || [], industry: r.industries?.[0] || 'Expert', tags: r.tags || [],
                        appearances: r.appearance_types || [], photo: r.photo_url || null
                    })));
                }
            }
            setLoading(false);
        };

        fetchProfile();
    }, [slug]);

    if (loading) {
        return <div className="min-h-screen pt-32 text-center font-sans animate-pulse">Loading profile...</div>;
    }

    if (!expertData) {
        return (
            <div className="min-h-screen pt-32 pb-24 bg-surface flex flex-col items-center justify-center">
                <h1 className="font-serif text-4xl text-primary font-bold mb-6">Expert Not Found</h1>
                <p className="font-sans text-text-dark mb-8">The profile you are looking for does not exist or has been removed.</p>
                <Button to="/directory" variant="primary">Return to Directory</Button>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-surface">
            <Helmet>
                <title>{expertData.name} | Draupadi on the Dais</title>
                <meta name="description" content={`${expertData.name} is a ${expertData.title} at ${expertData.org}. View her full profile and speaking topics.`} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": expertData.name,
                        "jobTitle": expertData.title,
                        "worksFor": {
                            "@type": "Organization",
                            "name": expertData.org
                        },
                        "url": `https://draupadionthedais.com/expert/${expertData.slug}`,
                        "image": expertData.photo
                    })}
                </script>
            </Helmet>

            <div className="max-w-7xl mx-auto px-6 py-12">

                <Link to="/directory" className="inline-flex items-center gap-2 text-text-mid hover:text-primary transition-colors font-sans text-sm font-medium mb-12">
                    <ArrowLeft size={16} /> Back to Directory
                </Link>

                <div className="flex flex-col lg:flex-row gap-16 item-start">

                    {/* Left Column (1/3) */}
                    <div className="w-full lg:w-1/3">
                        <div className="sticky top-[100px]">
                            <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-sm mb-8 border border-border">
                                {expertData.photo ? (
                                    <img src={expertData.photo} alt={expertData.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-primary-light" />
                                )}
                            </div>

                            <h1 className="font-serif text-4xl md:text-5xl text-primary font-bold mb-2 leading-tight">
                                {expertData.name}
                            </h1>
                            <p className="font-sans text-xl text-text-dark font-medium mb-1">
                                {expertData.title}
                            </p>
                            <p className="font-sans text-text-mid text-base mb-8">
                                {expertData.org} • {expertData.city.join(', ')}
                            </p>

                            <div className="space-y-6 border-t border-border pt-8">
                                <div>
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-text-mid mb-3">Industry</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {expertData.industries.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white border border-border text-text-dark font-sans text-xs font-medium rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-text-mid mb-3">Expertise</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {expertData.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white border border-border text-text-dark font-sans text-xs font-medium rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-text-mid mb-3">Available For</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {expertData.appearanceTypes.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-primary text-white font-sans text-xs font-medium rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Column (2/3) */}
                    <div className="w-full lg:w-2/3">

                        {/* Bio */}
                        <section className="mb-16">
                            <h3 className="font-serif text-3xl text-primary font-bold mb-6">About</h3>
                            <div className="font-sans text-lg text-text-dark leading-[1.8] space-y-4">
                                {expertData.bio.split('\n\n').map((paragraph, i) => (
                                    <p key={i}>{paragraph}</p>
                                ))}
                            </div>
                        </section>

                        {/* Links */}
                        <section className="mb-16">
                            <h3 className="font-serif text-3xl text-primary font-bold mb-6">Public Links</h3>
                            <div className="flex flex-wrap gap-4">
                                {expertData.linkedin && (
                                    <a href={expertData.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 border border-border bg-white rounded-xl font-sans text-sm font-medium hover:border-primary/50 transition-colors">
                                        <Briefcase size={18} className="text-blue-600" /> LinkedIn Profile
                                    </a>
                                )}
                                {expertData.instagram && (
                                    <a href={`https://instagram.com/${expertData.instagram}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 border border-border bg-white rounded-xl font-sans text-sm font-medium hover:border-primary/50 transition-colors">
                                        <MapPin size={18} className="text-pink-600" /> Instagram Handle
                                    </a>
                                )}
                                {expertData.website && (
                                    <a href={expertData.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 border border-border bg-white rounded-xl font-sans text-sm font-medium hover:border-primary/50 transition-colors">
                                        <ExternalLink size={18} className="text-slate-600" /> Personal Website
                                    </a>
                                )}
                            </div>
                        </section>

                        {/* In the Press */}
                        <section className="mb-16">
                            <h3 className="font-serif text-3xl text-primary font-bold mb-6">In the Press</h3>
                            <div className="space-y-4">
                                {expertData.press.map((item, i) => (
                                    <a key={i} href={item.url} target="_blank" rel="noreferrer" className="flex items-start justify-between p-5 bg-white border border-border rounded-2xl group hover:border-primary/50 hover:shadow-sm transition-all">
                                        <div>
                                            <p className="font-sans font-semibold text-text-dark text-lg group-hover:text-primary transition-colors">{item.title}</p>
                                            <p className="font-sans font-medium text-text-mid text-sm mt-1">{item.publisher}</p>
                                        </div>
                                        <ExternalLink size={20} className="text-text-mid group-hover:text-primary transition-colors shrink-0" />
                                    </a>
                                ))}
                            </div>
                        </section>

                        {/* Contact */}
                        <section className="p-8 bg-primary-light border border-primary/20 rounded-3xl">
                            <h3 className="font-serif text-2xl text-primary font-bold mb-4">Contact</h3>
                            <p className="font-sans text-text-dark text-lg leading-relaxed">
                                To reach {expertData.name.split(' ')[0]} directly, connect via her LinkedIn or Instagram. For event partnerships or media inquiries, email our team at <a href="mailto:ak@c4e.in" className="text-primary font-bold underline decoration-primary/30 underline-offset-4">ak@c4e.in</a>.
                            </p>
                        </section>

                    </div>
                </div>
            </div>

            {/* Recommendations */}
            {recommended.length > 0 && (
                <div className="bg-background py-24 border-t border-border">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="border border-border rounded-3xl p-8 bg-surface">
                            <h2 className="font-serif text-2xl text-primary font-bold mb-6">More experts you might be looking for</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {recommended.map(expert => (
                                    <ExpertCard key={expert.id} expert={expert} />
                                ))}
                            </div>
                            <div className="mt-8 text-center border-t border-border pt-8">
                                <Button to="/directory" variant="secondary" className="text-primary hover:border-primary">
                                    View Full Directory
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
