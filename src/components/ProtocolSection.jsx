import Button from './Button';

const SPEAKER_STEPS = [
    {
        number: '01',
        title: 'Apply and be reviewed',
        body: 'Tell us who you are and what you know. We review every application personally. Not everyone gets in. But if you have the expertise, you belong here.',
    },
    {
        number: '02',
        title: 'Go live on the Dais',
        body: 'If approved, your profile goes live. You get a link. You own your visibility.',
    },
    {
        number: '03',
        title: 'Be the name they find',
        body: 'When someone needs the right woman for the room, they find you here.',
    },
];

const ORGANISER_STEPS = [
    {
        number: '01',
        title: 'Find her by what she knows',
        body: 'Search by expertise, city, industry, and format. Not by name recognition.',
    },
    {
        number: '02',
        title: 'Profiles built for decisions',
        body: 'Structured information. Clear expertise. Past appearances. Enough to say yes.',
    },
    {
        number: '03',
        title: 'Go direct',
        body: 'Her contact is right there. Reach out. No intermediary, no friction.',
    },
];

function Step({ number, title, body, className = '' }) {
    return (
        <div className={`flex gap-6 ${className}`}>
            <div className="font-serif font-bold text-primary text-5xl md:text-6xl leading-none shrink-0 w-20 md:w-24">
                {number}
            </div>
            <div className="flex-1 pt-1">
                <h4 className="font-serif font-bold text-2xl md:text-3xl text-text-dark leading-tight mb-3">
                    {title}
                </h4>
                <p className="font-sans text-base md:text-lg text-text-dark leading-relaxed">
                    {body}
                </p>
            </div>
        </div>
    );
}

function Heading({ children, className = '' }) {
    return (
        <div className={className}>
            <h3 className="font-serif font-bold text-3xl md:text-4xl text-primary leading-tight inline-block">
                {children}
            </h3>
            <div className="mt-3 w-16 h-[3px] bg-primary rounded-full" />
        </div>
    );
}

export function ProtocolSection() {
    return (
        <section className="bg-surface relative w-full py-24 md:py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 md:mb-24">
                    <div className="font-sans text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-primary mb-5">
                        How It Works
                    </div>
                    <h2 className="font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-text-dark leading-tight max-w-4xl mx-auto">
                        Built for both sides of the stage
                    </h2>
                </div>

                {/*
                    Desktop (lg+): two-column grid, rows auto-sized to the taller item
                    in each pair so step 01 lines up with step 01, etc.
                    Mobile: single column, all Speaker content first, then Organiser.
                */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 lg:gap-x-20 gap-y-10 lg:gap-y-14">
                    <Heading className="order-1 lg:order-none">For Speakers</Heading>
                    <Heading className="order-6 lg:order-none">For Organisers</Heading>

                    <Step {...SPEAKER_STEPS[0]} className="order-2 lg:order-none" />
                    <Step {...ORGANISER_STEPS[0]} className="order-7 lg:order-none" />

                    <Step {...SPEAKER_STEPS[1]} className="order-3 lg:order-none" />
                    <Step {...ORGANISER_STEPS[1]} className="order-8 lg:order-none" />

                    <Step {...SPEAKER_STEPS[2]} className="order-4 lg:order-none" />
                    <Step {...ORGANISER_STEPS[2]} className="order-9 lg:order-none" />

                    <div className="order-5 lg:order-none pt-4">
                        <Button to="/apply" variant="primary">Join the Dais</Button>
                    </div>
                    <div className="order-10 lg:order-none pt-4">
                        <Button to="/directory" variant="secondary">Find Verified Speakers</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
