import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, ChevronDown, Filter } from 'lucide-react';
import ExpertCard from '../components/ExpertCard';

// Comprehensive mock data
export const MOCK_EXPERTS = [
    { id: 1, slug: 'aditi-sharma', name: "Dr. Aditi Sharma", title: "Chief Economist", org: "Global Finance Inst.", city: ["Mumbai"], industries: ["Finance & Banking"], tags: ["Leadership", "Personal Finance"], appearanceTypes: ["Speaker", "Keynote"], photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" },
    { id: 2, slug: 'priya-desai', name: "Priya Desai", title: "VP Product", org: "TechFlow", city: ["Bangalore", "Pune"], industries: ["Tech & Software"], tags: ["Product", "Innovation"], appearanceTypes: ["Panellist", "Podcast Guest"], photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop" },
    { id: 3, slug: 'sarah-thomas', name: "Sarah Thomas", title: "Climate Researcher", org: "Earth Policy", city: ["Delhi"], industries: ["Climate & Sustainability", "Policy"], tags: ["Climate Action", "Public Policy"], appearanceTypes: ["Speaker", "Media Quote / Commentary"], photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" },
    { id: 4, slug: 'neha-gupta', name: "Neha Gupta", title: "Managing Partner", org: "VentureX", city: ["Remote / Available Nationally"], industries: ["Finance & Banking", "Entrepreneurship & Startups"], tags: ["Investing & Wealth", "Entrepreneurship"], appearanceTypes: ["Speaker", "Panellist"], photo: "https://images.unsplash.com/photo-1598550874175-4d0ef43ce28d?q=80&w=600&auto=format&fit=crop" },
    { id: 5, slug: 'meera-kapoor', name: "Meera Kapoor", title: "Founding Partner", org: "Kapoor & Co. Law", city: ["Mumbai", "Delhi"], industries: ["Law & Legal"], tags: ["Legal Rights & Compliance", "Workplace Culture"], appearanceTypes: ["Panellist", "Media Quote / Commentary"], photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=600&auto=format&fit=crop" },
    { id: 6, slug: 'ananya-singh', name: "Ananya Singh", title: "Creative Director", org: "Studio Nova", city: ["Bangalore"], industries: ["Fashion & Design", "Media & Journalism"], tags: ["Brand Building", "Content & Storytelling"], appearanceTypes: ["Workshop Facilitator", "Speaker"], photo: "https://images.unsplash.com/photo-1531123897727-8f129e1eb704?q=80&w=600&auto=format&fit=crop" },
    { id: 7, slug: 'dr-kavita-rao', name: "Dr. Kavita Rao", title: "Head of Research", org: "National MedCorp", city: ["Hyderabad"], industries: ["Healthcare & Medicine"], tags: ["Mental Health & Wellbeing", "Leadership"], appearanceTypes: ["Speaker", "Media Quote / Commentary"], photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop" },
];

const INDUSTRIES = ["Tech & Software", "Finance & Banking", "Media & Journalism", "Law & Legal", "Healthcare & Medicine", "Climate & Sustainability", "Entrepreneurship & Startups", "Fashion & Design"];
const EXPERTISE = ["Leadership", "Personal Finance", "Product", "Innovation", "Climate Action", "Public Policy", "Investing & Wealth", "Entrepreneurship", "Legal Rights & Compliance", "Brand Building", "Content & Storytelling", "Mental Health & Wellbeing"];
const APPEARANCES = ["Speaker", "Panellist", "Media Quote / Commentary", "Podcast Guest", "Workshop Facilitator", "Keynote"];
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

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

// Simple check icon
const Check = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const CATEGORIES = {
    industries: ["Tech & Software", "Finance & Banking", "Media & Journalism", "Marketing & Communications", "Law & Legal", "Healthcare & Medicine", "Policy & Government", "Education & Academia", "Consulting & Strategy", "FMCG & Consumer Goods", "Fashion & Design", "Real Estate", "Non-profit & Social Impact", "Entrepreneurship & Startups", "HR & People", "Architecture & Urban Planning", "Sports & Fitness", "Arts & Culture", "Climate & Sustainability", "Research & Science"],
    expertise: ["Leadership & Management", "Entrepreneurship", "Personal Finance", "Investing & Wealth", "Mental Health & Wellbeing", "Career Transitions", "Workplace Culture", "Diversity & Inclusion", "Public Policy", "Gender & Feminism", "Digital & Social Media", "Brand Building", "Sales & Business Development", "Product & Innovation", "Data & AI", "Legal Rights & Compliance", "Nutrition & Fitness", "Relationships & Family", "Urban Living", "Content & Storytelling", "Education Reform", "Climate Action", "Community Building", "Negotiation & Advocacy", "Media & PR"],
    appearances: ["Speaker", "Panellist", "Media Quote / Commentary", "Podcast Guest", "Workshop Facilitator"],
    cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad", "Remote / Available Nationally"]
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

    useEffect(() => {
        const fetchApprovedExperts = async () => {
            const { data, error } = await supabase
                .from('experts')
                .select('*')
                .eq('status', 'approved')
                .order('created_at', { ascending: false });

            if (data) {
                // Map data slightly to fit the frontend ExpertCard expectations
                const mapped = data.map(dbExpert => ({
                    id: dbExpert.id,
                    slug: dbExpert.slug,
                    name: dbExpert.full_name,
                    title: dbExpert.title,
                    org: dbExpert.organisation,
                    city: dbExpert.city || [],
                    industries: dbExpert.industries || [], // Changed to industries (plural) to match mock data structure
                    tags: dbExpert.tags || [],
                    appearanceTypes: dbExpert.appearance_types || [], // Changed to appearanceTypes to match mock data structure
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
        });
    }, [searchQuery, filters, experts]);

    return (
        <div className="pt-32 pb-24 min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-12">
                    <h1 className="font-serif text-5xl md:text-6xl text-primary font-bold mb-4">Directory</h1>
                    <p className="font-sans text-xl text-text-dark">Find verified women experts for panels, media, and speaking.</p>
                </div>

                {/* Filter Bar (Sticky) */}
                <div className="sticky top-[80px] z-40 bg-surface/90 backdrop-blur-md border border-border rounded-3xl p-4 md:p-6 mb-12 shadow-sm flex flex-col gap-4">

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-mid" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, role, or keyword..."
                                className="w-full bg-white border border-border rounded-2xl pl-12 pr-4 py-3 font-sans text-text-dark focus:outline-none focus:border-primary/50 transition-colors"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Mobile Filter Toggle */}
                        <button
                            className="md:hidden flex items-center justify-center gap-2 border border-border bg-white rounded-2xl py-3 px-6 font-sans text-sm font-medium hover:bg-surface transition-colors"
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                        >
                            <Filter size={18} /> Filters {Object.values(filters).flat().length > 0 && `(${Object.values(filters).flat().length})`}
                        </button>
                    </div>

                    <div className={cn("flex-wrap items-center gap-3", isMobileFiltersOpen ? "flex mt-4" : "hidden md:flex")}>
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
                            <span className="text-text-mid">
                                {isLoading ? "Loading..." : `Showing ${filteredExperts.length} experts`}
                            </span>
                            <button
                                onClick={clearFilters}
                                className="text-primary hover:text-primary-hover font-medium flex items-center gap-1"
                            >
                                Clear all <X size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Expert Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredExperts.length > 0 ? (
                        filteredExperts.map(expert => (
                            <ExpertCard key={expert.id} expert={expert} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-text-mid font-sans text-lg border border-dashed border-border rounded-3xl">
                            No matching experts found. Try adjusting your filters.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
