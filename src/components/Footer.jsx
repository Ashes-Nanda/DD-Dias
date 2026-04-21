import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-surface border-t border-border pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-10">
                    <div>
                        <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mb-2">
                            Draupadi on the Dais
                        </h2>
                        <p className="font-sans text-text-mid text-lg">
                            A Decoding Draupadi Initiative
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 md:gap-8 font-sans font-medium text-text-dark text-base md:text-lg">
                        <Link to="/directory" className="hover:text-primary transition-colors">Find Verified Speakers</Link>
                        <Link to="/apply" className="hover:text-primary transition-colors">Join the Dais</Link>
                        <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                        <span className="text-text-dark">ak@c4e.in</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center border-t border-border/50 pt-8 gap-4">
                    <div className="flex flex-col gap-2 items-center md:items-start">
                        <p className="font-sans text-text-mid text-sm">
                            &copy; {new Date().getFullYear()} Draupadi on the Dais. All rights reserved.
                        </p>
                        <a
                            href="https://decodingdraupadi.com"
                            target="_blank"
                            rel="noreferrer"
                            className="font-sans text-text-mid text-sm hover:text-primary transition-colors"
                        >
                            Part of the Decoding Draupadi ecosystem → decodingdraupadi.com
                        </a>
                    </div>
                    <div className="flex space-x-6 text-text-mid">
                        {/* TODO: confirm DD Instagram URL before going live */}
                        <a href="https://www.instagram.com/decodingdraupadi/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
                            <Instagram size={24} />
                        </a>
                        {/* TODO: confirm DD LinkedIn URL before going live */}
                        <a href="https://www.linkedin.com/company/decodingdraupadi" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                            <Linkedin size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
