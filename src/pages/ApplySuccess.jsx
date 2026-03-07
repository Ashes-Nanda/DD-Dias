import React, { useEffect } from 'react';
import Button from '../components/Button';
import { Instagram, MessageCircle } from 'lucide-react';

export default function ApplySuccess() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-surface px-6">
            <div className="max-w-2xl mx-auto w-full bg-white border border-border p-10 md:p-16 rounded-[2.5rem] shadow-sm text-center">

                <div className="w-20 h-20 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/20">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl text-primary font-bold mb-6">
                    You're in the queue.
                </h1>

                <p className="font-sans text-xl text-text-dark font-medium leading-relaxed mb-6">
                    Thank you for applying to Draupadi on the Dais.
                </p>

                <p className="font-sans text-lg text-text-mid leading-relaxed mb-12">
                    We review applications personally — you'll hear from us within 5–7 business days. If approved, we'll send you a link to preview your profile before it goes live.
                </p>

                <div className="border-t border-border pt-12">
                    <p className="font-mono text-xs uppercase tracking-widest text-text-mid mb-6">While you wait</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#" className="flex items-center justify-center gap-3 px-6 py-4 border border-border bg-surface rounded-2xl hover:border-primary/50 font-sans text-text-dark font-medium transition-colors">
                            <Instagram className="text-pink-600" size={20} />
                            Follow on Instagram
                        </a>
                        <a href="#" className="flex items-center justify-center gap-3 px-6 py-4 border border-border bg-surface rounded-2xl hover:border-primary/50 font-sans text-text-dark font-medium transition-colors">
                            <MessageCircle className="text-green-600" size={20} />
                            Join DD Community
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
