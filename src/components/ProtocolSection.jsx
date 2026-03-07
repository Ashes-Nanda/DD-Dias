import React from 'react';
import { cn } from '../lib/utils';
import Button from './Button';

export function ProtocolSection() {

    return (
        <section className="bg-surface relative w-full pt-24 pb-48 px-6">
            <div className="w-full relative max-w-5xl mx-auto space-y-12">

                {/* Card 1 */}
                <div className="protocol-card sticky top-24 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border flex flex-col justify-between min-h-[500px] z-10 transition-transform">
                    <div>
                        <div className="font-mono text-sm tracking-widest text-text-mid mb-8 uppercase">Phase 01</div>
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-primary font-bold max-w-2xl leading-tight">Apply to join the <br />directory</h2>
                    </div>
                    <p className="font-sans text-xl md:text-2xl text-text-dark font-medium max-w-xl mt-8">
                        Submit your details. It's free, but selective. We review every application personally within 5-7 business days.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="protocol-card sticky top-32 bg-primary-light rounded-3xl p-8 md:p-12 shadow-md border border-primary/20 flex flex-col justify-between min-h-[500px] z-20 transition-transform">
                    <div>
                        <div className="font-mono text-sm tracking-widest text-primary mb-8 uppercase">Phase 02</div>
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-primary font-bold max-w-2xl leading-tight">Editorial Review & <br />Approval</h2>
                    </div>
                    <p className="font-sans text-xl md:text-2xl text-text-dark font-medium max-w-xl mt-8">
                        We ensure quality and relevance. Once approved, your profile goes live immediately. We give you a link to preview and share it.
                    </p>
                </div>

                {/* Card 3 */}
                <div className="protocol-card sticky top-40 bg-primary rounded-3xl p-8 md:p-12 shadow-lg flex flex-col justify-between min-h-[500px] z-30 transition-transform">
                    <div>
                        <div className="font-mono text-sm tracking-widest text-white/60 mb-8 uppercase">Phase 03</div>
                        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-bold max-w-2xl leading-tight">Take the <br />stage.</h2>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-12">
                        <p className="font-sans text-xl md:text-2xl text-primary-light font-medium max-w-xl">
                            Organisers find you via SEO or direct search. They reach out. You speak. The excuse is removed.
                        </p>
                        <Button to="/apply" variant="secondary" className="bg-white border-white text-primary">Apply Now</Button>
                    </div>
                </div>

            </div>
        </section>
    );
}
