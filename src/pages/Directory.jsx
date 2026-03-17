import { useState, useMemo, useEffect } from 'react';
import { Search, X, ChevronDown, Filter } from 'lucide-react';
import ExpertCard from '../components/ExpertCard';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

const CATEGORIES = {
    industries: ["Tech & Software", "Finance & Banking", "Media & Journalism", "Marketing & Communications", "Law & Legal", "Healthcare & Medicine", "Policy & Government", "Education & Academia", "Consulting & Strategy", "FMCG & Consumer Goods", "Fashion & Design", "Real Estate", "Non-profit & Social Impact", "Entrepreneurship & Startups", "HR & People", "Architecture & Urban Planning", "Sports & Fitness", "Arts & Culture", "Climate & Sustainability", "Research & Science"],
    expertise: ["Leadership & Management", "Entrepreneurship", "Personal Finance", "Investing & Wealth", "Mental Health & Wellbeing", "Career Transitions", "Workplace Culture", "Diversity & Inclusion", "Public Policy", "Gender & Feminism", "Digital & Social Media", "Brand Building", "Sales & Business Development", "Product & Innovation", "Data & AI", "Legal Rights & Compliance", "Nutrition & Fitness", "Relationships & Family", "Urban Living", "Content & Storytelling", "Education Reform", "Climate Action", "Community Building", "Negotiation & Advocacy", "Media & PR"],
    appearances: ["Speaker", "Panellist", "Media Quote / Commentary", "Podcast Guest", "Workshop Facilitator"],
    cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad", "Remote / Available Nationally"]
};

// Simple check icon
const Check = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

// Helper component for multi-select dropdown
const FilterDropdown = ({ label, options, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isOpen && !event.target.closest('.filter-dropdown-container')) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen]);

    return (
        <div className="relative filter-dropdown-container">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 border border-border bg-white px-4 py-2 rounded-xl font-sans text-sm text-text-dark hover:border-primary/50 transition-colors"
            >
                {label} {selected.length > 0 && <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">{selected.length}</span>}
                <ChevronDown size={16} className={cn("transition-transform", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-border rounded-xl shadow-lg z-50 p-2 max-h-64 overflow-y-auto custom-scrollbar">
                    {options.map(opt => (
                        <label key={opt} className="flex items-center gap-3 p-2 hover:bg-surface rounded-lg cursor-pointer">
                            <div className={cn("w-4 h-4 rounded border flex items-center justify-center transition-colors", selected.includes(opt) ? "bg-primary border-primary text-white" : "border-border")}>
                                {selected.includes(opt) && <Check size={12} />}
                            </div>
                            <span className="font-sans text-sm text-text-dark">{opt}</span>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={selected.includes(opt)}
                                onChange={() => {
                                    if (selected.includes(opt)) onChange(selected.filter(i => i !== opt));
                                    else onChange([...selected, opt]);
                                }}
                            />
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Directory() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        industries: [],
        expertise: [],
        appearances: [],
        cities: []
    });

    const [experts, setExperts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 200);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchApprovedExperts = async () => {
            const { data } = await supabase
                .from('experts')
                .select('*')
                .eq('status', 'approved')
                .order('created_at', { ascending: false });

            if (data) {
                const mapped = data.map(dbExpert => ({
                    id: dbExpert.id,
                    slug: dbExpert.slug,
                    name: dbExpert.full_name,
                    title: dbExpert.title,
                    org: dbExpert.organisation,
                    city: dbExpert.city || [],
                    industries: dbExpert.industries || [],
                    tags: dbExpert.tags || [],
                    appearanceTypes: dbExpert.appearance_types || [],
                    photo: dbExpert.photo_url || null
                }));
                setExperts(mapped);
            }
            setIsLoading(false);
        };
        fetchApprovedExperts();
    }, []);

    const handleFilterChange = (category, newSelection) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [category]: newSelection
        }));
    };

    const clearFilters = () => {
        setSearchQuery('');
        setFilters({ industries: [], expertise: [], appearances: [], cities: [] });
    };

    const removeFilter = (category, value) => {
        setFilters(prev => ({
            ...prev,
            [category]: prev[category].filter(v => v !== value)
        }));
    };

    // Client-side filtering
    const filteredExperts = useMemo(() => {
        return experts.filter(expert => {
            const matchesSearch = searchQuery === '' ||
                expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                expert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                expert.org.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesIndustry = filters.industries.length === 0 || expert.industries.some(i => filters.industries.includes(i));
            const matchesExpertise = filters.expertise.length === 0 || expert.tags.some(tag => filters.expertise.includes(tag));
            const matchesAppearance = filters.appearances.length === 0 || expert.appearanceTypes.some(app => filters.appearances.includes(app));
            const matchesCity = filters.cities.length === 0 || expert.city.some(c => filters.cities.includes(c));

            return matchesSearch && matchesIndustry && matchesExpertise && matchesAppearance && matchesCity;
        }).sort((a, b) => a.name.localeCompare(b.name));
    }, [searchQuery, filters, experts]);

    // Item 27: Correct pluralisation — "1 voice" vs "X voices"
    const resultCountText = () => {
        if (isLoading) return 'Loading...';
        const count = filteredExperts.length;
        return count === 1 ? 'Showing 1 voice' : `Showing ${count} voices`;
    };

    // Active filter chips for all categories
    const activeFilterEntries = Object.entries(filters).flatMap(([category, values]) =>
        values.map(value => ({ category, value }))
    );

    return (
        <div className="pt-32 pb-24 min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header — Item 25: "Directory" → "The Dais", Item 26: updated subheadline */}
                <div className="mb-12">
                    <h1 className="font-serif text-5xl md:text-6xl text-primary font-bold mb-4">The Dais</h1>
                    <p className="font-sans text-xl text-text-dark">India's curated network of women voices. Available for panels, media, and public conversation.</p>
                </div>

                {/* Filter Bar (Sticky) — compresses on scroll */}
                <div className={cn(
                    "sticky top-[80px] z-40 border border-border mb-6 flex flex-col gap-4 transition-all duration-300",
                    isScrolled
                        ? "bg-white shadow-md rounded-2xl p-3 md:p-4"
                        : "bg-surface rounded-3xl p-4 md:p-6 shadow-sm"
                )}>

                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-mid" size={isScrolled ? 16 : 20} />
                            <input
                                type="text"
                                placeholder="Search by name, role, or keyword..."
                                className={cn(
                                    "w-full bg-white border border-border rounded-2xl font-sans text-text-dark focus:outline-none focus:border-primary/50 transition-all",
                                    isScrolled ? "pl-10 pr-4 py-2 text-sm" : "pl-12 pr-4 py-3"
                                )}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Mobile Filter Toggle */}
                        <button
                            className="md:hidden flex items-center justify-center gap-2 border border-border bg-white rounded-2xl py-2 px-5 font-sans text-sm font-medium hover:bg-surface transition-colors"
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        >
                            <Filter size={16} /> Filters {Object.values(filters).flat().length > 0 && `(${Object.values(filters).flat().length})`}
                        </button>
                    </div>

                    <div className={cn("flex-wrap items-center gap-3", isMobileFiltersOpen ? "flex mt-2" : "hidden md:flex")}>
                        <FilterDropdown
                            label="Industry"
                            options={CATEGORIES.industries}
                            selected={filters.industries}
                            onChange={(selection) => handleFilterChange('industries', selection)}
                        />
                        <FilterDropdown
                            label="Expertise"
                            options={CATEGORIES.expertise}
                            selected={filters.expertise}
                            onChange={(selection) => handleFilterChange('expertise', selection)}
                        />
                        <FilterDropdown
                            label="Type of Appearance"
                            options={CATEGORIES.appearances}
                            selected={filters.appearances}
                            onChange={(selection) => handleFilterChange('appearances', selection)}
                        />
                        <FilterDropdown
                            label="City"
                            options={CATEGORIES.cities}
                            selected={filters.cities}
                            onChange={(selection) => handleFilterChange('cities', selection)}
                        />

                        <div className="md:ml-auto w-full md:w-auto flex items-center justify-between md:justify-end gap-4 text-sm font-sans mt-2 md:mt-0">
                            {/* Item 27: Fixed results count */}
                            <span className="text-text-mid">{resultCountText()}</span>
                            <button
                                onClick={clearFilters}
                                className="text-primary hover:text-primary-hover font-medium flex items-center gap-1"
                            >
                                Clear all <X size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Item 28: Active filter chips — removable tags below filter bar */}
                    {activeFilterEntries.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                            {activeFilterEntries.map(({ category, value }) => (
                                <button
                                    key={`${category}-${value}`}
                                    onClick={() => removeFilter(category, value)}
                                    className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 font-sans text-xs font-medium hover:bg-primary/20 transition-colors"
                                >
                                    {value}
                                    <X size={12} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Expert Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredExperts.length > 0 ? (
                        filteredExperts.map(expert => (
                            <ExpertCard key={expert.id} expert={expert} />
                        ))
                    ) : (
                        /* Item 29: Empty state with mailto link */
                        <div className="col-span-full py-20 text-center font-sans text-lg border border-dashed border-border rounded-3xl">
                            <p className="text-text-mid mb-2">No matches found. Try adjusting your filters — or{' '}
                                <a
                                    href="mailto:ak@c4e.in"
                                    className="text-primary font-medium hover:underline"
                                >
                                    tell us who should be on the Dais
                                </a>.
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
