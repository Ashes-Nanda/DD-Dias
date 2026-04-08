import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { cn } from '../lib/utils';
import { UploadCloud, Check, Plus, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Approved Tag Lists (V1 Defaults from PRD)
const INDUSTRIES = ["Tech & Software", "Finance & Banking", "Media & Journalism", "Marketing & Communications", "Law & Legal", "Healthcare & Medicine", "Policy & Government", "Education & Academia", "Consulting & Strategy", "FMCG & Consumer Goods", "Fashion & Design", "Real Estate", "Non-profit & Social Impact", "Entrepreneurship & Startups", "HR & People", "Architecture & Urban Planning", "Sports & Fitness", "Arts & Culture", "Climate & Sustainability", "Research & Science", "Tourism"];
const EXPERTISE = ["Leadership & Management", "Entrepreneurship", "Personal Finance", "Investing & Wealth", "Mental Health & Wellbeing", "Career Transitions", "Workplace Culture", "Diversity & Inclusion", "Public Policy", "Gender & Feminism", "Digital & Social Media", "Brand Building", "Sales & Business Development", "Product & Innovation", "Data & AI", "Legal Rights & Compliance", "Nutrition & Fitness", "Relationships & Family", "Urban Living", "Content & Storytelling", "Education Reform", "Climate Action", "Community Building", "Negotiation & Advocacy", "Media & PR"];
const APPEARANCES = ["Speaker", "Panellist", "Media Quote / Commentary", "Podcast Guest", "Workshop Facilitator"];
const CITIES = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad", "Remote / Available Nationally"];

export default function Apply() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        preferredName: '',
        email: '',
        phone: '',
        title: '',
        org: '',
        cities: [], // PRD calls for multi-select cities
        bio: '',
        industries: [],
        expertise: [],
        customExpertise: '',
        appearances: [],
        linkedin: '',
        instagram: '',
        website: '',
        notableAppearances: '',
        pressLinks: [
            { title: '', url: '' },
            { title: '', url: '' },
            { title: '', url: '' }
        ],
        hearSource: ''
        // hearSource kept for potential future use
    });

    const [file, setFile] = useState(null);
    const [customCityInputs, setCustomCityInputs] = useState([]);

    const handleMultiSelect = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(i => i !== value)
                : [...prev[field], value]
        }));
    };

    const addCustomCity = () => setCustomCityInputs(prev => [...prev, '']);
    const updateCustomCity = (index, value) => setCustomCityInputs(prev => prev.map((c, i) => i === index ? value : c));
    const removeCustomCity = (index) => setCustomCityInputs(prev => prev.filter((_, i) => i !== index));

    const handlePressLinkChange = (index, field, value) => {
        const newPressLinks = [...formData.pressLinks];
        newPressLinks[index][field] = value;
        setFormData(prev => ({ ...prev, pressLinks: newPressLinks }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please upload a headshot.");
            return;
        }

        const allCities = [...formData.cities, ...customCityInputs.map(c => c.trim()).filter(Boolean)];
        if (allCities.length === 0) {
            alert("Please select at least one city.");
            return;
        }

        setIsSubmitting(true);

        // Upload image to Supabase Storage
        let photo_url = null;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file);

        if (uploadError) {
            console.error("Error uploading image:", uploadError);
            alert("Error uploading image. Please ensure it's less than 5MB and try again.");
            setIsSubmitting(false);
            return;
        }

        const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
        photo_url = publicUrlData.publicUrl;

        // Generate a basic slug
        const generatedSlug = formData.fullName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.floor(Math.random() * 1000);

        // Prepare tags and press
        const finalTags = [...formData.expertise];
        if (formData.customExpertise.trim()) {
            finalTags.push(...formData.customExpertise.split(',').map(t => t.trim()).filter(Boolean));
        }

        // Only keep press links that have URLs
        const validPressLinks = formData.pressLinks.filter(p => p.url.trim() !== "").map(p => ({
            title: p.title || "Press Mention", // Fallback title
            publisher: new URL(p.url).hostname.replace('www.', ''), // Extract domain as publisher fallback, can be edited by admin
            url: p.url
        }));

        const { error } = await supabase.from('experts').insert([{
            full_name: formData.fullName,
            slug: generatedSlug,
            email: formData.email,
            title: formData.title,
            organisation: formData.org,
            city: allCities,
            industries: formData.industries,
            appearance_types: formData.appearances,
            bio: formData.bio,
            tags: finalTags,
            photo_url: photo_url,
            linkedin_url: formData.linkedin,
            instagram_handle: formData.instagram.replace('@', ''),
            website_url: formData.website,
            press_links: validPressLinks,
            status: 'pending'
            // PRD note: Phone, Preferred Name, Notable Appearances, Hear Source, Anything Else are mostly internal.
            // For V1 complexity, we can store these in an 'application_notes' json or just leave to DB schema expansion if needed.
            // Since schema is locked for now with those core columns, we rely on core ones.
        }]);

        setIsSubmitting(false);

        if (error) {
            console.error("Error submitting application:", error);
            alert("Something went wrong submitting your application. Please try again.");
        } else {
            navigate('/apply/thank-you', { state: { name: formData.fullName.split(' ')[0] } });
        }
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-background">
            <div className="max-w-3xl mx-auto px-6">

                {/* Header — items 32 & 33 */}
                <div className="mb-16">
                    <h1 className="font-serif text-5xl md:text-6xl text-primary font-bold mb-6 tracking-tight">Take the stage.<br />Officially.</h1>
                    <div className="font-sans text-xl text-text-dark leading-relaxed mb-8 max-w-2xl space-y-4">
                        <p>We built the Dais because qualified women kept being left off panels. Not because they didn't exist, but because nobody had built the infrastructure to find them.</p>
                        <p>If you're a practitioner, researcher, executive, or public thinker with something to say, apply to join. We review every application personally. Not everyone gets in. Those who do are the women organisers across India will come looking for.</p>
                    </div>
                    {/* Item 33: More prominent bullet points */}
                    <ul className="space-y-4 font-sans text-text-dark">
                        <li className="flex items-start gap-3">
                            <span className="mt-1 w-5 h-5 flex-shrink-0 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">✓</span>
                            <span className="font-medium">Your profile on a curated, verified platform. Not a generic list.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 w-5 h-5 flex-shrink-0 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">✓</span>
                            <span className="font-medium">Visibility to organisers, journalists, and companies looking for the right voice.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 w-5 h-5 flex-shrink-0 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">✓</span>
                            <span className="font-medium">Free to apply. Selective by design.</span>
                        </li>
                    </ul>
                </div>

                {/* Progress Indicator (#19) */}
                <div className="mb-8">
                    <div className="flex items-center gap-0">
                        {['Personal Details', 'Expertise', 'Media & Links', 'Submit'].map((step, i, arr) => (
                            <div key={step} className="flex items-center flex-1 last:flex-none">
                                <div className="flex flex-col items-center gap-1.5">
                                    <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/30 text-primary font-sans text-xs font-bold flex items-center justify-center">
                                        {i + 1}
                                    </div>
                                    <span className="font-sans text-[11px] text-text-mid font-medium whitespace-nowrap hidden sm:block">{step}</span>
                                </div>
                                {i < arr.length - 1 && (
                                    <div className="flex-1 h-px bg-border mx-2 mb-5" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-12 bg-white border border-border rounded-3xl p-8 md:p-12 shadow-sm">

                    {/* Section 1: Basics */}
                    <div className="space-y-6">
                        <h3 className="font-serif text-2xl text-primary font-bold border-b border-border pb-4">Personal Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-sans text-sm font-bold text-text-dark mb-2">Full Name *</label>
                                <input required type="text" value={formData.fullName} onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))} className="w-full border border-border rounded-xl px-4 py-3 bg-surface focus:outline-none focus:border-primary/50 transition-colors" placeholder="Dr. Aditi Sharma" />
                            </div>
                            <div>
                                <label className="block font-sans text-sm font-bold text-text-dark mb-2">Preferred Name (Optional)</label>
                                <input type="text" value={formData.preferredName} onChange={(e) => setFormData(prev => ({ ...prev, preferredName: e.target.value }))} className="w-full border border-border rounded-xl px-4 py-3 bg-surface focus:outline-none focus:border-primary/50 transition-colors" placeholder="Aditi" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-sans text-sm font-bold text-text-dark mb-2">Email Address *</label>
                                <input required type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="w-full border border-border rounded-xl px-4 py-3 bg-surface focus:outline-none focus:border-primary/50 transition-colors" placeholder="aditi@example.com" />
                                <p className="text-xs text-text-mid mt-2 font-sans">Used for approval communication only.</p>
                            </div>
                            <div>
                                <label className="block font-sans text-sm font-bold text-text-dark mb-2">Phone Number (Optional)</label>
                                <input type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} className="w-full border border-border rounded-xl px-4 py-3 bg-surface focus:outline-none focus:border-primary/50 transition-colors" placeholder="+91 98765 43210" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-sans text-sm font-bold text-text-dark mb-2">Current Title *</label>
                                <input required type="text" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} className="w-full border border-border rounded-xl px-4 py-3 bg-surface focus:outline-none focus:border-primary/50 transition-colors" placeholder="Chief Economist" />
                            </div>
                            <div>
                                <label className="block font-sans text-sm font-bold text-text-dark mb-2">Organisation *</label>
                                <input required type="text" value={formData.org} onChange={(e) => setFormData(prev => ({ ...prev, org: e.target.value }))} className="w-full border border-border rounded-xl px-4 py-3 bg-surface focus:outline-none focus:border-primary/50 transition-colors" placeholder="Global Finance Inst. (or 'Independent')" />
                            </div>
                        </div>

                        <div>
                            <label className="block font-sans text-sm font-bold text-text-dark mb-3">Primary City (Select all that apply) *</label>
                            <div className="flex flex-wrap gap-3">
                                {CITIES.map(c => (
                                    <label key={c} className={cn("cursor-pointer border rounded-full px-4 py-2 text-sm font-sans transition-colors", formData.cities.includes(c) ? "bg-primary text-white border-primary" : "bg-white border-border text-text-dark hover:border-primary/50")}>
                                        <input type="checkbox" className="hidden" checked={formData.cities.includes(c)} onChange={() => handleMultiSelect('cities', c)} />
                                        {c}
                                    </label>
                                ))}
                            </div>

                            {customCityInputs.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {customCityInputs.map((city, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={city}
                                                onChange={(e) => updateCustomCity(index, e.target.value)}
                                                className="flex-1 border border-border rounded-xl px-4 py-2.5 bg-surface focus:outline-none focus:border-primary/50 transition-colors font-sans text-sm"
                                                placeholder="e.g. Indore"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeCustomCity(index)}
                                                className="p-2 text-text-mid hover:text-primary transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={addCustomCity}
                                className="mt-3 flex items-center gap-1.5 text-primary font-sans text-sm font-medium hover:underline"
                            >
                                <Plus size={15} /> Add another city
                            </button>
                        </div>
                    </div>

                    {/* Section 2: Expertise */}
                    <div className="space-y-6 pt-6">
                        <h3 className="font-serif text-2xl text-primary font-bold border-b border-border pb-4">Professional Expertise</h3>

                        <div>
                            <label className="block font-sans text-sm font-bold text-text-dark mb-3">Industry (Select all that apply) *</label>
                            <div className="flex flex-wrap gap-3">
                                {INDUSTRIES.map(ind => (
                                    <label key={ind} className={cn("cursor-pointer border rounded-full px-4 py-2 text-sm font-sans transition-colors", formData.industries.includes(ind) ? "bg-primary text-white border-primary" : "bg-white border-border text-text-dark hover:border-primary/50")}>
                                        <input type="checkbox" className="hidden" checked={formData.industries.includes(ind)} onChange={() => handleMultiSelect('industries', ind)} />
                                        {ind}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block font-sans text-sm font-bold text-text-dark mb-3">Expertise / Topics (Select all that apply) *</label>
                            <div className="flex flex-wrap gap-3">
                                {EXPERTISE.map(exp => (
                                    <label key={exp} className={cn("cursor-pointer border rounded-full px-4 py-2 text-sm font-sans transition-colors", formData.expertise.includes(exp) ? "bg-primary text-white border-primary" : "bg-white border-border text-text-dark hover:border-primary/50")}>
                                        <input type="checkbox" className="hidden" checked={formData.expertise.includes(exp)} onChange={() => handleMultiSelect('expertise', exp)} />
                                        {exp}
                                    </label>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={formData.customExpertise}
                                onChange={(e) => setFormData(prev => ({ ...prev, customExpertise: e.target.value }))}
                                className="w-full border border-border rounded-xl px-4 py-3 mt-4 bg-surface focus:outline-none focus:border-primary/50 transition-colors font-sans"
                                placeholder="Other topics? (comma-separated, e.g. GenAI ethics, PropTech)"
                            />
                        </div>

                        <div>
                            <label className="block font-sans text-sm font-bold text-text-dark mb-3">Available For (Select all that apply) *</label>
                            <div className="flex flex-wrap gap-3">
                                {APPEARANCES.map(app => (
                                    <label key={app} className={cn("cursor-pointer border rounded-full px-4 py-2 text-sm font-sans transition-colors", formData.appearances.includes(app) ? "bg-primary text-white border-primary" : "bg-white border-border text-text-dark hover:border-primary/50")}>
                                        <input type="checkbox" className="hidden" checked={formData.appearances.includes(app)} onChange={() => handleMultiSelect('appearances', app)} />
                                        {app}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block font-sans text-sm font-bold text-text-dark mb-2">Professional Bio *</label>
                            <textarea required rows={6} value={formData.bio} onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))} className="w-full border border-border rounded-xl px-4 py-3 bg-surface focus:outline-none focus:border-primary/50 transition-colors resize-none font-sans leading-relaxed" placeholder="Aditi Sharma is a Chief Economist specializing in emerging markets..."></textarea>
                            <p className="text-xs text-text-mid mt-2 font-sans">Write in third person. This will appear exactly on your public profile. (300–500 words recommended)</p>
                            {/* Item 37: Collapsible bio help prompt */}
                            <details className="mt-3">
                                <summary className="text-xs text-primary font-sans font-medium cursor-pointer hover:underline">Need help writing your bio?</summary>
                                <p className="mt-2 text-xs text-text-mid font-sans leading-relaxed bg-surface border border-border rounded-xl p-3">
                                    Try: '<strong>[Your name]</strong> is a <strong>[title]</strong> specialising in <strong>[area]</strong>. She has <strong>[2–3 credential lines]</strong>. She is available for <strong>[appearance types]</strong>.'
                                </p>
                            </details>
                        </div>
                    </div>

                    {/* Section 3: Media & Links */}
                    <div className="space-y-6 pt-6">
                        <h3 className="font-serif text-2xl text-primary font-bold border-b border-border pb-4">Media & Links</h3>

                        <div>
                            <label className="block font-sans text-sm font-bold text-text-dark mb-2">Headshot Upload *</label>
                            <label className={cn("w-full border-2 border-dashed transition-colors rounded-2xl overflow-hidden cursor-pointer group", file ? "border-primary" : "border-border hover:border-primary/50")}>
                                {file ? (
                                    <div className="relative">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Headshot preview"
                                            className="w-full max-h-72 object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-primary/90 px-4 py-2.5 flex items-center gap-2">
                                            <Check className="text-white shrink-0" size={15} />
                                            <p className="font-sans text-xs font-medium text-white truncate">{file.name}</p>
                                            <span className="ml-auto font-sans text-xs text-white/70 shrink-0">Click to change</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-8 flex flex-col items-center justify-center bg-surface">
                                        <UploadCloud className="text-text-mid group-hover:text-primary transition-colors mb-3" size={32} />
                                        <p className="font-sans text-sm font-bold text-text-dark">Click to upload or drag and drop</p>
                                        <p className="font-sans text-xs text-text-mid mt-1">JPG, PNG (Max 5MB). Square or portrait aspect ratio preferred.</p>
                                    </div>
                                )}
                                <input
                                    required={!file}
                                    type="file"
                                    className="hidden"
                                    accept="image/jpeg, image/png, image/webp"
                                    onChange={(e) => e.target.files && e.target.files[0] && setFile(e.target.files[0])}
                                />
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-sans text-sm font-bold text-text-dark mb-2">LinkedIn URL *</label>
                                <input required type="url" value={formData.linkedin} onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))} className="w-full border border-border rounded-xl px-4 py-3 bg-surface focus:outline-none focus:border-primary/50 transition-colors" placeholder="https://linkedin.com/in/..." />
                            </div>
                            <div>
                                <label className="block font-sans text-sm font-bold text-text-dark mb-2">Instagram Handle *</label>
                                <input required type="text" value={formData.instagram} onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))} className="w-full border border-border rounded-xl px-4 py-3 bg-surface focus:outline-none focus:border-primary/50 transition-colors" placeholder="@decodingdraupadi" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block font-sans text-sm font-bold text-text-dark mb-2">Personal Website (Optional)</label>
                                <input type="url" value={formData.website} onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))} className="w-full border border-border rounded-xl px-4 py-3 bg-surface focus:outline-none focus:border-primary/50 transition-colors" placeholder="https://..." />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <label className="block font-sans text-sm font-bold text-text-dark mb-1">Notable Appearances (Optional)</label>
                            <p className="text-xs text-text-mid font-sans mt-0 mb-3">Past panels, publications, podcasts — helps with curation decision.</p>
                            <textarea rows={3} value={formData.notableAppearances} onChange={(e) => setFormData(prev => ({ ...prev, notableAppearances: e.target.value }))} className="w-full border border-border rounded-xl px-4 py-3 bg-surface focus:outline-none focus:border-primary/50 transition-colors resize-none font-sans" placeholder="Spoke at Global Startup Summit 2023..."></textarea>
                        </div>

                        <div className="space-y-4 pt-4">
                            <label className="block font-sans text-sm font-bold text-text-dark">In the Press / Notable Links (Optional)</label>
                            <p className="text-xs text-text-mid font-sans mt-0 mb-3">Share recent press, podcast appearances, or major panel videos.</p>

                            {[0, 1, 2].map((i) => (
                                <div key={i} className="flex flex-col sm:flex-row gap-3">
                                    {/* Item 38: Removed trailing dash from placeholder */}
                                    <input type="text" value={formData.pressLinks[i].title} onChange={(e) => handlePressLinkChange(i, 'title', e.target.value)} className="flex-1 border border-border rounded-xl px-4 py-3 bg-surface focus:outline-none focus:border-primary/50" placeholder={`Display Title (e.g. ET Women in Leadership 2024)`} />
                                    <input type="url" value={formData.pressLinks[i].url} onChange={(e) => handlePressLinkChange(i, 'url', e.target.value)} className="flex-1 border border-border rounded-xl px-4 py-3 bg-surface focus:outline-none focus:border-primary/50" placeholder="https://..." />
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="pt-8 flex flex-col items-center">
                        <p className="font-sans text-sm text-text-mid mb-6 text-center">We review applications within 5–7 business days. You'll hear from us either way.</p>
                        <Button type="submit" variant="primary" className="w-full py-4 text-lg" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}
