import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Linkedin, Instagram, Globe } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ExpertCard from '../components/ExpertCard';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

// Mock specific details that aren't in the directory level mock array
// MOCK_BIO and MOCK_PRESS are replaced by data fetched from Supabase

function ContactForm({ expertName }) {
    const firstName = expertName.split(' ')[0];
    const [form, setForm] = useState({
        name: '',
        org: '',
        message: `Hi,\n\nMy name is [Name].\nI am from [Organization].\n\nI am trying to reach ${expertName} regarding an event opportunity.\n\nCould you help connect us?`
    });
    const [sent, setSent] = useState(false);

    const handleChange = (field, value) => {
        setForm(prev => {
            const updated = { ...prev, [field]: value };
            // Keep message template in sync as name/org are typed
            if (field === 'name' || field === 'org') {
                const n = field === 'name' ? value : prev.name;
                const o = field === 'org' ? value : prev.org;
                updated.message = `Hi,\n\nMy name is ${n || '[Name]'}.\nI am from ${o || '[Organization]'}.\n\nI am trying to reach ${expertName} regarding an event opportunity.\n\nCould you help connect us?`;
            }
            return updated;
        });
    };

    const handleSend = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Event Opportunity - Connect with ${expertName}`);
        const body = encodeURIComponent(form.message);
        window.location.href = `mailto:ak@c4e.in?subject=${subject}&body=${body}`;
        setSent(true);
    };

    return (
        <section className="p-8 bg-primary-light border border-primary/20 rounded-3xl">
            <h3 className="font-serif text-2xl text-primary font-bold mb-2">Get in Touch</h3>
            <p className="font-sans text-text-dark text-base leading-relaxed mb-6">
                Want to book {firstName} for an event or media opportunity? Send a message to the Dais team and we'll help connect you.
            </p>

            {sent ? (
                <div className="bg-white border border-primary/20 rounded-2xl p-6 text-center">
                    <p className="font-serif text-xl text-primary font-bold mb-1">Message sent.</p>
                    <p className="font-sans text-text-mid text-sm">Your email client should have opened. We'll be in touch soon.</p>
                </div>
            ) : (
                <form onSubmit={handleSend} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-sans text-xs font-bold text-text-dark uppercase tracking-wider mb-1.5">Your Name *</label>
                            <input
                                required
                                type="text"
                                value={form.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="Priya Mehta"
                                className="w-full border border-primary/20 bg-white rounded-xl px-4 py-2.5 font-sans text-sm text-text-dark focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block font-sans text-xs font-bold text-text-dark uppercase tracking-wider mb-1.5">Organisation *</label>
                            <input
                                required
                                type="text"
                                value={form.org}
                                onChange={(e) => handleChange('org', e.target.value)}
                                placeholder="TED Mumbai"
                                className="w-full border border-primary/20 bg-white rounded-xl px-4 py-2.5 font-sans text-sm text-text-dark focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block font-sans text-xs font-bold text-text-dark uppercase tracking-wider mb-1.5">Message *</label>
                        <textarea
                            required
                            rows={6}
                            value={form.message}
                            onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
                            className="w-full border border-primary/20 bg-white rounded-xl px-4 py-3 font-sans text-sm text-text-dark leading-relaxed resize-none focus:outline-none focus:border-primary/50 transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-primary text-white font-sans font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary-hover transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                        </svg>
                        Send Message
                    </button>
                </form>
            )}
        </section>
    );
}

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

                // Fetch approved experts sharing tags or industries, sorted alphabetically
                const { data: recData } = await supabase
                    .from('experts')
                    .select('*')
                    .eq('status', 'approved')
                    .neq('id', data.id)
                    .order('full_name', { ascending: true });

                if (recData) {
                    const expertTags = data.tags || [];
                    const expertIndustries = data.industries || [];

                    // Prefer experts sharing at least one tag or industry
                    const similar = recData.filter(r =>
                        (r.tags || []).some(t => expertTags.includes(t)) ||
                        (r.industries || []).some(i => expertIndustries.includes(i))
                    );

                    // Fall back to any experts if fewer than 3 similar ones
                    const pool = similar.length >= 3 ? similar : recData;

                    setRecommended(pool.slice(0, 3).map(r => ({
                        id: r.id, slug: r.slug, name: r.full_name, title: r.title, org: r.organisation,
                        city: r.city || [], industry: r.industries?.[0] || 'Expert', tags: r.tags || [],
                        appearanceTypes: r.appearance_types || [], photo: r.photo_url || null
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
                <Button to="/directory" variant="primary">Return to the Dais</Button>
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-surface">
            <Helmet>
                {/* Item 52: Dynamic meta title format: '[Name] - [Expertise] | Draupadi on the Dais' */}
                <title>{expertData.name} - {expertData.tags?.[0] || expertData.title} | Draupadi on the Dais</title>
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
                    <ArrowLeft size={16} /> Back to the Dais
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
                                        <Linkedin size={18} className="text-blue-600" /> LinkedIn Profile
                                    </a>
                                )}
                                {expertData.instagram && (
                                    <a href={expertData.instagram.includes('http') ? expertData.instagram : `https://instagram.com/${expertData.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 border border-border bg-white rounded-xl font-sans text-sm font-medium hover:border-primary/50 transition-colors">
                                        <Instagram size={18} className="text-pink-600" /> Instagram Profile
                                    </a>
                                )}
                                {expertData.website && (
                                    <a href={expertData.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 border border-border bg-white rounded-xl font-sans text-sm font-medium hover:border-primary/50 transition-colors">
                                        <Globe size={18} className="text-slate-600" /> Personal Website
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
                        <ContactForm expertName={expertData.name} />

                    </div>
                </div>
            </div>

            {/* Recommendations */}
            {recommended.length > 0 && (
                <div className="bg-background py-24 border-t border-border">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="border border-border rounded-3xl p-8 bg-surface">
                            <h2 className="font-serif text-2xl text-primary font-bold mb-6">More Like This</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {recommended.map(expert => (
                                    <ExpertCard key={expert.id} expert={expert} />
                                ))}
                            </div>
                            <div className="mt-8 text-center border-t border-border pt-8">
                                <Button to="/directory" variant="secondary" className="text-primary hover:border-primary">
                                    Enter the Dais
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
