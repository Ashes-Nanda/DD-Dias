import dais3Image from '../assets/dais 3.png';

export function PhilosophySection() {

    return (
        <section
            className="relative min-h-[40vh] flex items-center justify-center text-white px-6 py-20 overflow-hidden"
            style={{
                backgroundImage: `url(${dais3Image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Item 23: Remove "The Philosophy" label, update copy, keep black banner treatment */}
            <div className="max-w-4xl mx-auto text-center z-10 relative">
                <p className="font-sans text-2xl md:text-4xl leading-relaxed md:leading-[1.4] text-white font-medium">
                    Open networks become noise.<br />
                    Curated ones become the standard.<br />
                    We chose the latter.
                </p>
            </div>
        </section>
    );
}
