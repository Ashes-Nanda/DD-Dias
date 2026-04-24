const TOPICS = [
    'Leadership & Strategy',
    'Venture & Finance',
    'Mental Health at Work',
    'Technology & AI',
    'Policy & Governance',
    'Entrepreneurship',
    'Media & Journalism',
    'Gender & Identity',
    'Culture & Creativity',
    'Education & Research',
];

function Row({ ariaHidden }) {
    return (
        <ul
            className="flex items-center shrink-0 gap-10 pr-10"
            aria-hidden={ariaHidden || undefined}
        >
            {TOPICS.map((topic) => (
                <li key={topic} className="flex items-center gap-10 whitespace-nowrap">
                    <span className="font-sans text-sm md:text-[15px] font-medium tracking-[0.2em] uppercase text-white">
                        {topic}
                    </span>
                    <span aria-hidden className="text-white/70 text-lg leading-none">·</span>
                </li>
            ))}
        </ul>
    );
}

export default function TopicMarquee() {
    return (
        <div
            className="w-full bg-primary overflow-hidden"
            style={{ height: '52px' }}
            role="marquee"
            aria-label="Topic areas covered by speakers on the Dais"
        >
            <div className="flex items-center h-full marquee-track">
                <Row />
                <Row ariaHidden />
            </div>
        </div>
    );
}
