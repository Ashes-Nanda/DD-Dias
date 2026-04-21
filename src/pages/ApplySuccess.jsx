import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { Instagram, MessageCircle } from 'lucide-react';

export default function ApplySuccess() {
    const { state } = useLocation();
    const firstName = state?.name || '';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-surface px-6">
            <div className="max-w-2xl mx-auto w-full bg-white border border-border p-10 md:p-16 rounded-[2.5rem] shadow-sm text-center">

                <div className="w-20 h-20 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto mb-10 border border-primary/20">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                {/* Item 51: Updated headline and body */}
                <h1 className="font-serif text-4xl md:text-5xl text-primary font-bold mb-8">
                    {firstName ? `${firstName}, you're on the list.` : "You're on the list."}
                </h1>

                <p className="font-sans text-xl text-text-dark font-medium leading-relaxed mb-6">
                    Thank you for applying to Draupadi on the Dais.
                </p>

                <p className="font-sans text-lg text-text-mid leading-relaxed mb-14">
                    We review applications personally - you'll hear from us within 5–7 business days.<br />
                    If approved, we'll send you your profile link to preview and share.
                </p>

                <div className="border-t border-border pt-14">
                    <p className="font-mono text-xs uppercase tracking-widest text-text-mid mb-6">While you wait</p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* TODO: confirm DD Instagram URL before going live */}
                        <a href="https://www.instagram.com/decodingdraupadi/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 border border-border bg-surface rounded-2xl hover:border-primary/50 font-sans text-text-dark font-medium transition-colors">
                            <Instagram className="text-pink-600" size={20} />
                            Follow on Instagram
                        </a>
                        {/* TODO: replace with actual DD WhatsApp community link */}
                        <a href="https://chat.whatsapp.com/placeholder" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 border border-border bg-surface rounded-2xl hover:border-primary/50 font-sans text-text-dark font-medium transition-colors">
                            <MessageCircle className="text-green-600" size={20} />
                            Join DD Community
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
